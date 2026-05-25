import type {
  GameState,
  CommunityCard,
  IncidentCard,
  Card,
  NeighborhoodId,
  DeviceType,
  SlotIndex,
  Position,
  RoleId,
} from '../types/game';
import { COMMUNITY_CARDS, INCIDENT_CARDS } from '../data/cards';
import { SURVEILLANCE_CARDS } from '../data/surveillanceCards';
import { ROLES } from '../data/roles';

// ── Utilities ──────────────────────────────────────────────────────────────

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function neighborhoodIndex(id: NeighborhoodId): number {
  return ['suburb', 'courthouse', 'media', 'politics'].indexOf(id);
}

function deviceForTracker(tracker: number): DeviceType {
  if (tracker <= 2) return 'ring';
  if (tracker <= 4) return 'smart-speaker';
  if (tracker <= 6) return 'traffic-camera';
  return 'flock-reader';
}

function meterShiftForDevice(device: DeviceType): number {
  if (device === 'ring' || device === 'smart-speaker') return -1;
  if (device === 'traffic-camera') return -2;
  return -3; // flock-reader
}

function deviceEmoji(device: DeviceType): string {
  if (device === 'ring') return '📷';
  if (device === 'smart-speaker') return '🔊';
  if (device === 'traffic-camera') return '🚦';
  return '🚗';
}

function log(state: GameState, msg: string): GameState {
  return { ...state, gameLog: [msg, ...state.gameLog.slice(0, 49)] };
}

function shiftMeter(state: GameState, delta: number, reason: string): GameState {
  const newVal = clamp(state.privacyMeter + delta, 0, 30);
  const s = { ...state, privacyMeter: newVal };
  const sign = delta > 0 ? `+${delta}` : `${delta}`;
  return log(s, `Meter ${sign} (${reason}) → ${newVal}`);
}

function buildCommunityDeck(): Card[] {
  const allCards: Card[] = [...COMMUNITY_CARDS, ...INCIDENT_CARDS];
  return shuffle(allCards);
}

// Slot adjacency within a neighborhood: N1(0) N2(1) N3(2) N4(3)
// 0↔1, 0↔2, 1↔3, 2↔3  (corners of a 2×2 grid)
function adjacentSlots(slot: SlotIndex): SlotIndex[] {
  const adj: Record<SlotIndex, SlotIndex[]> = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2],
  };
  return adj[slot];
}

// ── Initial State ──────────────────────────────────────────────────────────

export function buildInitialState(playerCount: 2 | 3 | 4): GameState {
  const roles = ROLES.slice(0, playerCount);
  const players = roles.map((role, i) => ({
    id: i,
    role,
    position: role.homeNeighborhood as Position,
    hand: [] as CommunityCard[],
    hasUsedSpecialAbilityThisTurn: false,
  }));

  const communityDeck = buildCommunityDeck();

  // Deal 4 starting cards each
  let deck = [...communityDeck];
  const dealtPlayers = players.map((p) => {
    const hand: CommunityCard[] = [];
    while (hand.length < 4 && deck.length > 0) {
      const card = deck.shift()!;
      if (card.type === 'community') hand.push(card);
      else deck.push(card); // put incident back at end
    }
    return { ...p, hand };
  });

  const neighborhoods = [
    { id: 'suburb' as NeighborhoodId, name: 'Suburb', slots: [null, null, null, null], densityTrack: 0 },
    { id: 'courthouse' as NeighborhoodId, name: 'Courthouse', slots: [null, null, null, null], densityTrack: 0 },
    { id: 'media' as NeighborhoodId, name: 'Media District', slots: [null, null, null, null], densityTrack: 0 },
    { id: 'politics' as NeighborhoodId, name: 'Politics Row', slots: [null, null, null, null], densityTrack: 0 },
  ];

  return {
    phase: 'journalist-preview',
    round: 1,
    currentPlayerIndex: 0,
    actionsRemaining: 0,

    privacyMeter: 20,
    densityTracker: 1,

    neighborhoods,
    players: dealtPlayers,

    communityDeck: deck,
    communityDiscard: [],
    surveillanceDeck: shuffle([...SURVEILLANCE_CARDS]),
    surveillanceDiscard: [],

    revealedSurveillanceCards: [],
    journalistPreviewDone: false,

    pendingIncident: null,

    blockedBoardPhases: 0,
    reducedBoardPhaseRounds: 0,
    cancelNextSurveillance: 0,
    cancelNextIncident: false,
    pendingExtraActions: 0,

    pendingDiceRoll: true,
    lastDiceRoll: null,

    gameLog: ['Game started! Good luck reclaiming the block.'],
    lossReason: undefined,
  };
}

// ── Action Types ──────────────────────────────────────────────────────────

export type GameAction =
  | { type: 'JOURNALIST_PREVIEW_DONE' }
  | { type: 'ROLL_DIE' }
  | { type: 'MOVE'; to: Position }
  | { type: 'REMOVE_DEVICE'; neighborhoodId: NeighborhoodId; slotIndex: SlotIndex; cardIds: [string, string] }
  | { type: 'LEGAL_REMOVE_DEVICE'; neighborhoodId: NeighborhoodId; slotIndex: SlotIndex; cardIds: [string, string] }
  | { type: 'SWAP_CARDS'; withPlayerId: number; giveCardIds: string[]; takeCardIds: string[] }
  | { type: 'PLAY_CARD'; cardId: string; targetNeighborhoodId?: NeighborhoodId; targetSlotIndex?: SlotIndex; targetPlayerId?: number; chosenPosition?: Position }
  | { type: 'DEPOSIT_AT_CITY_HALL'; cardIds: string[] }
  | { type: 'USE_SPECIAL_ABILITY'; targetNeighborhoodId?: NeighborhoodId; targetSlotIndex?: SlotIndex; revealCount?: number }
  | { type: 'END_TURN' }
  | { type: 'BOARD_PHASE' }
  | { type: 'INCIDENT_VOTE'; choice: 'comply' | 'refuse' }
  | { type: 'DISCARD_CARD'; cardId: string };

// ── Helpers ───────────────────────────────────────────────────────────────

function drawCommunityCards(state: GameState, playerId: number, count: number): GameState {
  let s = { ...state };
  let deck = [...s.communityDeck];
  let discard = [...s.communityDiscard];
  let deferredIncident: IncidentCard | null = null;

  for (let i = 0; i < count; i++) {
    if (deck.length === 0) {
      if (discard.length === 0) break;
      deck = shuffle(discard);
      discard = [];
      s = log(s, 'Community deck reshuffled from discard.');
    }
    const card = deck.shift()!;
    if (card.type === 'incident') {
      discard.push(card);
      if (s.cancelNextIncident) {
        s = { ...s, cancelNextIncident: false };
        s = log(s, `Incident "${card.name}" cancelled by Class Action.`);
      } else if (!deferredIncident) {
        // Defer so the player finishes drawing their remaining cards first
        deferredIncident = card as IncidentCard;
      }
    } else {
      const players = s.players.map((p) =>
        p.id === playerId ? { ...p, hand: [...p.hand, card as CommunityCard] } : p
      );
      s = { ...s, players };
    }
  }

  s = { ...s, communityDeck: deck, communityDiscard: discard };

  if (deferredIncident) {
    s = { ...s, pendingIncident: { card: deferredIncident } };
    s = log(s, `⚠️ INCIDENT: ${deferredIncident.name}`);
  }

  return s;
}

function drawCommunityCardsForAll(state: GameState, count: number): GameState {
  let s = state;
  for (const player of s.players) {
    s = drawCommunityCards(s, player.id, count);
  }
  return s;
}

function removeCardFromHand(state: GameState, playerId: number, cardIds: string[]): GameState {
  const players = state.players.map((p) => {
    if (p.id !== playerId) return p;
    const hand = p.hand.filter((c) => !cardIds.includes(c.id));
    return { ...p, hand };
  });
  const removed = state.players.find((p) => p.id === playerId)?.hand.filter((c) => cardIds.includes(c.id)) ?? [];
  return { ...state, players, communityDiscard: [...state.communityDiscard, ...removed] };
}

function removeDeviceFromSlot(
  state: GameState,
  neighborhoodId: NeighborhoodId,
  slotIndex: SlotIndex
): GameState {
  const neighborhoods = state.neighborhoods.map((n) => {
    if (n.id !== neighborhoodId) return n;
    const slots = [...n.slots] as (DeviceType | null)[];
    slots[slotIndex] = null;
    const densityTrack = Math.max(0, slots.filter(Boolean).length);
    return { ...n, slots, densityTrack };
  });
  return { ...state, neighborhoods };
}

function spendActions(state: GameState, count: number): GameState {
  return { ...state, actionsRemaining: state.actionsRemaining - count };
}

function placeDevice(
  state: GameState,
  neighborhoodId: NeighborhoodId,
  slotIndex: SlotIndex,
  device: DeviceType
): GameState {
  let s = { ...state };
  const nIdx = neighborhoodIndex(neighborhoodId);
  const n = s.neighborhoods[nIdx];

  if (n.slots[slotIndex] !== null) {
    // Slot already full — skip
    return log(s, `Slot ${slotIndex + 1} in ${n.name} already occupied, device skipped.`);
  }

  const slots = [...n.slots] as (DeviceType | null)[];
  slots[slotIndex] = device;
  const densityTrack = slots.filter(Boolean).length;

  s = {
    ...s,
    neighborhoods: s.neighborhoods.map((nb, i) =>
      i === nIdx ? { ...nb, slots, densityTrack } : nb
    ),
  };

  // Meter shift for device type
  const deviceShift = meterShiftForDevice(device);
  s = shiftMeter(s, deviceShift, `${deviceEmoji(device)} placed in ${n.name}`);

  // Density threshold shifts
  if (densityTrack === 2) {
    s = shiftMeter(s, -1, '2 slots filled in ' + n.name);
  } else if (densityTrack === 3) {
    s = shiftMeter(s, -2, '3 slots filled in ' + n.name);
  } else if (densityTrack === 4) {
    s = shiftMeter(s, -3, `Neighborhood full (${n.name})`);
    s = { ...s, densityTracker: Math.min(8, s.densityTracker + 1) };
    s = log(s, `Density Tracker increased to ${s.densityTracker}`);
    // Draw incident card
    const communityDeck = [...s.communityDeck];
    const discard = [...s.communityDiscard];
    for (let i = 0; i < communityDeck.length; i++) {
      if (communityDeck[i].type === 'incident') {
        const incident = communityDeck.splice(i, 1)[0] as IncidentCard;
        discard.push(incident);
        if (!s.cancelNextIncident) {
          s = { ...s, pendingIncident: { card: incident }, communityDeck, communityDiscard: discard };
          s = log(s, `⚠️ INCIDENT (neighborhood full): ${incident.name}`);
        } else {
          s = { ...s, cancelNextIncident: false, communityDeck, communityDiscard: discard };
          s = log(s, `Incident "${incident.name}" cancelled by Class Action.`);
        }
        break;
      }
    }
  }

  // Flock reader bleed
  if (device === 'flock-reader') {
    // Also affect adjacent slots within neighborhood
    const adjSlots = adjacentSlots(slotIndex as SlotIndex);
    for (const adj of adjSlots) {
      if (slots[adj] === null) {
        s = shiftMeter(s, -1, `Flock Reader radius affects slot ${adj + 1} in ${n.name}`);
      }
    }
    // Bleed to adjacent neighborhood on board (-1)
    s = shiftMeter(s, -1, `Flock Reader bleeds into adjacent neighborhood`);
  }

  return s;
}

// ── Incident Resolution ───────────────────────────────────────────────────

function resolveIncident(state: GameState, incident: IncidentCard, voteChoice?: 'comply' | 'refuse'): GameState {
  let s: GameState = { ...state, pendingIncident: null };
  s = log(s, `Resolving incident: ${incident.name}`);

  switch (incident.effectType) {
    case 'add-devices-to-neighborhood': {
      // Add 2 devices to the most-filled neighborhood
      const target = [...s.neighborhoods].sort((a, b) => b.densityTrack - a.densityTrack)[0];
      const device = deviceForTracker(s.densityTracker);
      for (let i = 0; i < 2; i++) {
        const emptySlotIdx = s.neighborhoods.find(n => n.id === target.id)!.slots.findIndex((sl) => sl === null);
        if (emptySlotIdx === -1) break;
        s = placeDevice(s, target.id, emptySlotIdx as SlotIndex, device);
      }
      s = shiftMeter(s, -2, 'Breaking News: Crime Reported');
      break;
    }
    case 'meter-minus':
      s = shiftMeter(s, -3, 'Innocent Person Flagged');
      break;
    case 'police-footage-request':
      if (voteChoice === 'comply') {
        s = shiftMeter(s, -3, 'Police Footage Request — complied');
      } else {
        s = shiftMeter(s, -2, 'Police Footage Request — refused');
      }
      break;
    case 'add-device-all-neighborhoods': {
      const device = deviceForTracker(s.densityTracker);
      for (const n of s.neighborhoods) {
        const emptySlot = n.slots.findIndex((sl) => sl === null);
        if (emptySlot !== -1) {
          s = placeDevice(s, n.id, emptySlot as SlotIndex, device);
          s = shiftMeter(s, -2, `Surveillance Expansion in ${n.name}`);
        }
      }
      break;
    }
    case 'neighbor-reports-neighbor': {
      s = shiftMeter(s, -2, 'Neighbor Reports Neighbor');
      // Active player discards 1 card
      const activePlayer = s.players[s.currentPlayerIndex];
      if (activePlayer.hand.length > 0) {
        const toDiscard = activePlayer.hand[0];
        s = removeCardFromHand(s, activePlayer.id, [toDiscard.id]);
        s = log(s, `${activePlayer.role.name} discarded "${toDiscard.name}"`);
      }
      break;
    }
    case 'government-contract': {
      // Add 3 devices to the neighborhood with fewest devices
      const target = [...s.neighborhoods].sort((a, b) => a.densityTrack - b.densityTrack)[0];
      const device = deviceForTracker(s.densityTracker);
      for (let i = 0; i < 3; i++) {
        const emptySlot = target.slots.findIndex((sl) => sl === null);
        if (emptySlot === -1) break;
        s = placeDevice(s, target.id, emptySlot as SlotIndex, device);
      }
      s = { ...s, densityTracker: Math.min(8, s.densityTracker + 1) };
      s = log(s, `Density Tracker increased to ${s.densityTracker}`);
      break;
    }
  }

  return s;
}

// ── Card Effect Application ───────────────────────────────────────────────

function applyCardEffect(
  state: GameState,
  card: CommunityCard,
  playerId: number,
  opts: {
    targetNeighborhoodId?: NeighborhoodId;
    targetSlotIndex?: SlotIndex;
    targetPlayerId?: number;
    chosenPosition?: Position;
  }
): GameState {
  let s = state;

  switch (card.effectType) {
    case 'meter-plus':
    case 'meter-plus-immediate':
      s = shiftMeter(s, card.effectValue ?? 1, card.name);
      break;

    case 'draw-cards':
      s = drawCommunityCards(s, playerId, card.effectValue ?? 1);
      break;

    case 'draw-cards-all':
    case 'draw-cards-swap':
      s = drawCommunityCardsForAll(s, card.effectValue ?? 1);
      break;

    case 'remove-device-own': {
      const player = s.players.find((p) => p.id === playerId)!;
      const home = s.neighborhoods.find((n) => n.id === player.role.homeNeighborhood)!;
      const count = card.effectValue ?? 1;
      let removed = 0;
      let tempS = s;
      for (let i = 0; i < 4 && removed < count; i++) {
        if (home.slots[i] !== null) {
          tempS = removeDeviceFromSlot(tempS, home.id, i as SlotIndex);
          tempS = shiftMeter(tempS, 1, `Device removed from ${home.name}`);
          removed++;
        }
      }
      s = tempS;
      break;
    }

    case 'remove-device-any':
    case 'remove-devices-any': {
      const targetId = opts.targetNeighborhoodId;
      const targetSlot = opts.targetSlotIndex;
      if (targetId !== undefined && targetSlot !== undefined) {
        const count = card.effectValue ?? 1;
        let removed = 0;
        let tempS = s;
        // Remove from specific slot first, then others
        if (removed < count && tempS.neighborhoods.find((n) => n.id === targetId)!.slots[targetSlot] !== null) {
          tempS = removeDeviceFromSlot(tempS, targetId, targetSlot);
          tempS = shiftMeter(tempS, 1, `Device removed from ${targetId}`);
          removed++;
        }
        // For remove-devices-any with count > 1, remove more from same neighborhood
        if (card.effectType === 'remove-devices-any' && count > 1) {
          const n = tempS.neighborhoods.find((nb) => nb.id === targetId)!;
          for (let i = 0; i < 4 && removed < count; i++) {
            if (n.slots[i] !== null) {
              tempS = removeDeviceFromSlot(tempS, targetId, i as SlotIndex);
              tempS = shiftMeter(tempS, 1, `Device removed from ${targetId}`);
              removed++;
            }
          }
        }
        s = tempS;
      }
      break;
    }

    case 'remove-all-own': {
      const player = s.players.find((p) => p.id === playerId)!;
      const nId = player.role.homeNeighborhood;
      const n = s.neighborhoods.find((nb) => nb.id === nId)!;
      let tempS = s;
      for (let i = 0; i < 4; i++) {
        if (n.slots[i] !== null) {
          tempS = removeDeviceFromSlot(tempS, nId, i as SlotIndex);
          tempS = shiftMeter(tempS, 1, `Device removed from ${n.name}`);
        }
      }
      s = tempS;
      break;
    }

    case 'block-board-phase':
      s = { ...s, blockedBoardPhases: s.blockedBoardPhases + 1 };
      s = log(s, 'Board Phase blocked for 1 round!');
      break;

    case 'cancel-next-surveillance':
      s = { ...s, cancelNextSurveillance: s.cancelNextSurveillance + 1 };
      s = log(s, 'Next Surveillance Card placement cancelled!');
      break;

    case 'cancel-next-2-surveillance':
      s = { ...s, cancelNextSurveillance: s.cancelNextSurveillance + 2 };
      s = log(s, 'Next 2 Surveillance Card placements cancelled!');
      break;

    case 'cancel-next-incident':
      s = { ...s, cancelNextIncident: true };
      s = log(s, 'Next Incident Card will be cancelled!');
      break;

    case 'cancel-footage-request':
      s = { ...s, cancelNextIncident: true }; // reuse — treated as "cancel next police footage incident"
      s = log(s, 'Next Police Footage Request cancelled!');
      break;

    case 'wildcard-deposit':
      s = log(s, `${card.name} counts as wildcard for next deposit.`);
      break;

    case 'actions-all':
      s = { ...s, pendingExtraActions: s.pendingExtraActions + (card.effectValue ?? 1) };
      s = log(s, `All players gain +${card.effectValue ?? 1} action(s) next turn.`);
      break;

    case 'actions-current':
      s = { ...s, actionsRemaining: s.actionsRemaining + (card.effectValue ?? 1) };
      s = log(s, `+${card.effectValue ?? 1} action(s) added.`);
      break;

    case 'move-any':
      if (opts.chosenPosition) {
        const players = s.players.map((p) =>
          p.id === playerId ? { ...p, position: opts.chosenPosition! } : p
        );
        s = { ...s, players };
        s = log(s, `${s.players[playerId].role.name} moved to ${opts.chosenPosition}`);
      }
      break;

    case 'move-player-here': {
      if (opts.targetPlayerId !== undefined) {
        const mover = s.players.find((p) => p.id === playerId)!;
        const players = s.players.map((p) =>
          p.id === opts.targetPlayerId ? { ...p, position: mover.position } : p
        );
        s = { ...s, players };
        s = log(s, `Player moved to ${mover.position}`);
      }
      break;
    }

    case 'reveal-surveillance': {
      const count = card.effectValue ?? 3;
      const revealed = s.surveillanceDeck.slice(0, count);
      s = { ...s, revealedSurveillanceCards: revealed };
      s = log(s, `Revealed top ${revealed.length} Surveillance Cards.`);
      break;
    }

    case 'reveal-top-surveillance': {
      const revealed = s.surveillanceDeck.slice(0, 1);
      s = { ...s, revealedSurveillanceCards: revealed };
      s = log(s, `Revealed top Surveillance Card.`);
      break;
    }

    case 'reduced-deposit':
      s = log(s, 'Next City Hall deposit only needs 4 cards!');
      break;

    case 'board-phase-reduced':
      s = { ...s, reducedBoardPhaseRounds: s.reducedBoardPhaseRounds + (card.effectValue ?? 3) };
      s = log(s, `Board Phase reduced for ${card.effectValue ?? 3} rounds.`);
      break;

    case 'swap-cards':
    case 'none':
      break;
  }

  return s;
}

// ── Win/Loss Check ─────────────────────────────────────────────────────────

function checkWinLoss(state: GameState): GameState {
  if (state.privacyMeter <= 0) {
    return { ...state, phase: 'lost', lossReason: 'Privacy and Community Trust Meter hit 0.' };
  }
  const gameHasProgressed = state.surveillanceDiscard.length > 0;
  const allClear = state.neighborhoods.every((n) => n.densityTrack === 0);
  if (gameHasProgressed && allClear) {
    return { ...state, phase: 'won' };
  }
  return state;
}

// ── Main Reducer ──────────────────────────────────────────────────────────

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (state.phase === 'won' || state.phase === 'lost') return state;

  switch (action.type) {
    // ── Journalist Preview ─────────────────────────────────────────────
    case 'JOURNALIST_PREVIEW_DONE': {
      const journalist = state.players.find((p) => p.role.id === 'journalist');
      let s = state;
      if (journalist && !state.journalistPreviewDone) {
        const revealed = s.surveillanceDeck.slice(0, 2);
        s = { ...s, revealedSurveillanceCards: revealed, journalistPreviewDone: true };
        s = log(s, `${journalist.role.name} revealed top 2 Surveillance Cards.`);
      }
      s = {
        ...s,
        phase: 'player-turn',
        actionsRemaining: 0,
        pendingDiceRoll: true,
      };
      s = log(s, `Round ${s.round} — ${s.players[s.currentPlayerIndex].role.name}'s turn. Roll the dice!`);
      return checkWinLoss(s);
    }

    // ── Roll die (start of player turn) ───────────────────────────────
    case 'ROLL_DIE': {
      if (!state.pendingDiceRoll) return state;
      const roll = Math.floor(Math.random() * 6) + 1;
      let s: GameState = {
        ...state,
        actionsRemaining: roll + state.pendingExtraActions,
        pendingExtraActions: 0,
        pendingDiceRoll: false,
        lastDiceRoll: roll,
      };
      s = log(s, `${s.players[s.currentPlayerIndex].role.name} rolled a ${roll}! (${s.actionsRemaining} actions)`);
      return s;
    }

    // ── Move ──────────────────────────────────────────────────────────
    case 'MOVE': {
      if (state.actionsRemaining < 1) return state;
      const players = state.players.map((p) =>
        p.id === state.players[state.currentPlayerIndex].id ? { ...p, position: action.to } : p
      );
      let s = spendActions({ ...state, players }, 1);
      s = log(s, `${s.players[state.currentPlayerIndex].role.name} moved to ${action.to}`);
      return s;
    }

    // ── Remove device (standard: 1 action + 2 cards matching neighborhood color) ──────
    case 'REMOVE_DEVICE': {
      if (state.actionsRemaining < 1) return state;
      const player = state.players[state.currentPlayerIndex];
      const hand = player.hand;
      const cards = action.cardIds.map((id) => hand.find((c) => c.id === id)!).filter(Boolean);
      if (cards.length < 2) return state;
      if (cards[0].category !== cards[1].category) return state;
      const NHCOLOR: Record<string, string> = { suburb: 'yellow', courthouse: 'blue', media: 'green', politics: 'red' };
      if (cards[0].category !== NHCOLOR[action.neighborhoodId]) return state;

      const n = state.neighborhoods.find((nb) => nb.id === action.neighborhoodId);
      if (!n || n.slots[action.slotIndex] === null) return state;

      let s = removeCardFromHand(state, player.id, action.cardIds);
      s = removeDeviceFromSlot(s, action.neighborhoodId, action.slotIndex);
      s = shiftMeter(s, 1, `Device removed from ${n.name}`);
      s = spendActions(s, 1);
      s = log(s, `${player.role.name} removed device from ${n.name} slot ${action.slotIndex + 1}`);
      return checkWinLoss(s);
    }

    // ── Legal Advocate special remove (any 2 cards) ───────────────────
    case 'LEGAL_REMOVE_DEVICE': {
      const player = state.players[state.currentPlayerIndex];
      if (player.role.id !== 'legal') return state;
      if (state.actionsRemaining < 1) return state;
      if (player.hasUsedSpecialAbilityThisTurn) return state;

      const n = state.neighborhoods.find((nb) => nb.id === action.neighborhoodId);
      if (!n || n.slots[action.slotIndex] === null) return state;

      let s = removeCardFromHand(state, player.id, action.cardIds);
      s = removeDeviceFromSlot(s, action.neighborhoodId, action.slotIndex);
      s = shiftMeter(s, 1, `Legal Advocate removed device from ${n.name}`);
      s = spendActions(s, 1);
      const players = s.players.map((p) =>
        p.id === player.id ? { ...p, hasUsedSpecialAbilityThisTurn: true } : p
      );
      s = { ...s, players };
      s = log(s, `${player.role.name} used special ability to remove device from ${n.name}`);
      return checkWinLoss(s);
    }

    // ── Swap cards ────────────────────────────────────────────────────
    case 'SWAP_CARDS': {
      if (state.actionsRemaining < 1) return state;
      const player = state.players[state.currentPlayerIndex];
      const other = state.players.find((p) => p.id === action.withPlayerId);
      if (!other) return state;
      if (player.position !== other.position) return state;

      const giveCards = player.hand.filter((c) => action.giveCardIds.includes(c.id));
      const takeCards = other.hand.filter((c) => action.takeCardIds.includes(c.id));

      const players = state.players.map((p) => {
        if (p.id === player.id) {
          const hand = [
            ...p.hand.filter((c) => !action.giveCardIds.includes(c.id)),
            ...takeCards,
          ];
          return { ...p, hand };
        }
        if (p.id === action.withPlayerId) {
          const hand = [
            ...p.hand.filter((c) => !action.takeCardIds.includes(c.id)),
            ...giveCards,
          ];
          return { ...p, hand };
        }
        return p;
      });

      let s = spendActions({ ...state, players }, 1);
      s = log(s, `${player.role.name} swapped cards with ${other.role.name}`);
      return s;
    }

    // ── Play power-up card ────────────────────────────────────────────
    case 'PLAY_CARD': {
      if (state.actionsRemaining < 1) return state;
      const player = state.players[state.currentPlayerIndex];
      const card = player.hand.find((c) => c.id === action.cardId);
      if (!card) return state;

      let s = removeCardFromHand(state, player.id, [action.cardId]);
      s = spendActions(s, 1);
      s = applyCardEffect(s, card, player.id, {
        targetNeighborhoodId: action.targetNeighborhoodId,
        targetSlotIndex: action.targetSlotIndex,
        targetPlayerId: action.targetPlayerId,
        chosenPosition: action.chosenPosition,
      });
      s = log(s, `${player.role.name} played "${card.name}"`);
      return checkWinLoss(s);
    }

    // ── Deposit at City Hall ──────────────────────────────────────────
    case 'DEPOSIT_AT_CITY_HALL': {
      if (state.actionsRemaining < 1) return state;
      const player = state.players[state.currentPlayerIndex];
      if (player.position !== 'city-hall') return state;

      const isCouncil = player.role.id === 'council';
      const required = isCouncil ? 4 : 5;
      const cards = action.cardIds.map((id) => player.hand.find((c) => c.id === id)!).filter(Boolean);

      if (cards.length < required) return state;

      // Validate: one of each color (council member needs 4 distinct colors, others need 5)
      const colors = new Set(cards.map((c) => c.category));
      const wildcards = cards.filter((c) => c.effectType === 'wildcard-deposit').length;
      const needed = isCouncil ? 4 : 5;
      if (colors.size + wildcards < needed) {
        return log(state, `Deposit failed: need ${needed} different colors (have ${colors.size + wildcards}).`);
      }

      // Find which neighborhood to clear (must be decided by UI — for now clear least dense)
      // In practice UI should pass targetNeighborhoodId — we'll clear the most dense
      const target = [...state.neighborhoods].sort((a, b) => b.densityTrack - a.densityTrack)[0];

      let s = removeCardFromHand(state, player.id, action.cardIds);
      // Remove all devices
      for (let i = 0; i < 4; i++) {
        if (target.slots[i] !== null) {
          s = removeDeviceFromSlot(s, target.id, i as SlotIndex);
        }
      }
      s = shiftMeter(s, 4, 'City Hall deposit');
      s = { ...s, densityTracker: Math.max(1, s.densityTracker - 1) };
      s = shiftMeter(s, 1, 'Density Tracker decreased');
      s = spendActions(s, 1);
      s = log(s, `${player.role.name} deposited at City Hall — ${target.name} cleared!`);
      return checkWinLoss(s);
    }

    // ── Use special ability ───────────────────────────────────────────
    case 'USE_SPECIAL_ABILITY': {
      if (state.actionsRemaining < 1) return state;
      const player = state.players[state.currentPlayerIndex];
      if (player.hasUsedSpecialAbilityThisTurn) return state;

      let s = state;

      switch (player.role.id as RoleId) {
        case 'organizer': {
          // Draw 2 extra cards if co-located with another player
          const colocated = s.players.some((p) => p.id !== player.id && p.position === player.position);
          if (colocated) {
            s = drawCommunityCards(s, player.id, 2);
            s = log(s, `${player.role.name} drew 2 extra cards (organizer ability)`);
          } else {
            return log(s, 'Organizer ability requires another player on same space.');
          }
          break;
        }
        case 'journalist': {
          const revealed = s.surveillanceDeck.slice(0, 2);
          s = { ...s, revealedSurveillanceCards: revealed };
          s = log(s, `${player.role.name} previewed top 2 Surveillance Cards`);
          break;
        }
        case 'council': {
          // Handled via deposit — no standalone action
          s = log(s, 'Council Member deposit bonus applied automatically at City Hall.');
          break;
        }
        case 'legal': {
          // Handled via LEGAL_REMOVE_DEVICE
          s = log(s, 'Use Legal Advocate ability via the Remove Device (any 2 cards) action.');
          break;
        }
      }

      const players = s.players.map((p) =>
        p.id === player.id ? { ...p, hasUsedSpecialAbilityThisTurn: true } : p
      );
      s = spendActions({ ...s, players }, 1);
      return checkWinLoss(s);
    }

    // ── End turn ──────────────────────────────────────────────────────
    case 'END_TURN': {
      const player = state.players[state.currentPlayerIndex];
      let s = state;

      // Draw 2 community cards
      s = drawCommunityCards(s, player.id, 2);

      // Organizer draws an extra card if colocated (same neighborhood counts)
      if (player.role.id === 'organizer') {
        const nids = ['suburb', 'courthouse', 'media', 'politics'] as const;
        const playerNhd = nids.find((id) => player.position === id || player.position.startsWith(id + '-n'));
        const colocated = s.players.some((p) => {
          if (p.id === player.id) return false;
          if (playerNhd && (p.position === playerNhd || p.position.startsWith(playerNhd + '-n'))) return true;
          return p.position === player.position;
        });
        if (colocated) {
          s = drawCommunityCards(s, player.id, 1);
        }
      }

      // Enforce hand limit 7
      const updatedPlayer = s.players.find((p) => p.id === player.id)!;
      if (updatedPlayer.hand.length > 7) {
        const excess = updatedPlayer.hand.slice(7);
        s = removeCardFromHand(s, player.id, excess.map((c) => c.id));
        s = log(s, `${player.role.name} discarded ${excess.length} card(s) to meet hand limit.`);
      }

      // Advance player
      const nextIndex = (s.currentPlayerIndex + 1) % s.players.length;
      const isNewRound = nextIndex === 0;

      if (isNewRound) {
        s = { ...s, phase: 'board-phase', currentPlayerIndex: nextIndex };
        s = log(s, 'All players done — moving to Board Phase.');
      } else {
        // Next player's turn — they must roll first
        const nextPlayer = s.players[nextIndex];
        const players = s.players.map((p) =>
          p.id === nextPlayer.id ? { ...p, hasUsedSpecialAbilityThisTurn: false } : p
        );
        s = {
          ...s,
          currentPlayerIndex: nextIndex,
          actionsRemaining: 0,
          players,
          phase: 'player-turn',
          pendingDiceRoll: true,
        };
        s = log(s, `${nextPlayer.role.name}'s turn — roll the dice!`);
      }

      return checkWinLoss(s);
    }

    // ── Board Phase ───────────────────────────────────────────────────
    case 'BOARD_PHASE': {
      let s = state;

      if (s.blockedBoardPhases > 0) {
        s = { ...s, blockedBoardPhases: s.blockedBoardPhases - 1 };
        s = log(s, 'Board Phase blocked by community action!');
      } else if (s.cancelNextSurveillance > 0) {
        s = { ...s, cancelNextSurveillance: s.cancelNextSurveillance - 1 };
        const top = s.surveillanceDeck[0];
        if (top) {
          const deck = s.surveillanceDeck.slice(1);
          s = { ...s, surveillanceDeck: deck, surveillanceDiscard: [...s.surveillanceDiscard, top] };
          s = log(s, `Surveillance Card cancelled: ${top.neighborhood} slot ${top.slot + 1}`);
        }
      } else {
        let deck = [...s.surveillanceDeck];
        if (deck.length === 0) {
          deck = shuffle([...s.surveillanceDiscard]);
          s = { ...s, surveillanceDiscard: [] };
          s = log(s, 'Surveillance deck reshuffled from discard.');
        }

        const card = deck.shift()!;
        s = { ...s, surveillanceDeck: deck, surveillanceDiscard: [...s.surveillanceDiscard, card] };

        const device = deviceForTracker(s.densityTracker);
        s = placeDevice(s, card.neighborhood, card.slot, device);
        s = log(s, `Board Phase: ${deviceEmoji(device)} placed in ${card.neighborhood} slot ${card.slot + 1}`);
      }

      if (s.reducedBoardPhaseRounds > 0) {
        s = { ...s, reducedBoardPhaseRounds: s.reducedBoardPhaseRounds - 1 };
      }

      // Clear revealed surveillance cards after board phase
      s = { ...s, revealedSurveillanceCards: [] };

      // Advance to next round journalist preview
      const nextPlayers = s.players.map((p) => ({ ...p, hasUsedSpecialAbilityThisTurn: false }));
      s = {
        ...s,
        phase: 'journalist-preview',
        round: s.round + 1,
        currentPlayerIndex: 0,
        actionsRemaining: 0,
        players: nextPlayers,
        journalistPreviewDone: false,
        pendingDiceRoll: true,
      };
      s = log(s, `--- Round ${s.round} begins ---`);

      return checkWinLoss(s);
    }

    // ── Incident vote ─────────────────────────────────────────────────
    case 'INCIDENT_VOTE': {
      if (!state.pendingIncident) return state;
      const incident = state.pendingIncident.card;
      return resolveIncident(state, incident, action.choice);
    }

    // ── Discard card ──────────────────────────────────────────────────
    case 'DISCARD_CARD': {
      const player = state.players[state.currentPlayerIndex];
      return removeCardFromHand(state, player.id, [action.cardId]);
    }

    default:
      return state;
  }
}
