export type NeighborhoodId = 'suburb' | 'courthouse' | 'media' | 'politics';
export type RoleId = 'organizer' | 'legal' | 'journalist' | 'council';
export type DeviceType = 'ring' | 'smart-speaker' | 'traffic-camera' | 'flock-reader';
export type CardCategory = 'blue' | 'yellow' | 'green' | 'red' | 'purple';
export type SlotIndex = 0 | 1 | 2 | 3;

export type Position =
  | NeighborhoodId
  | 'city-hall'
  | 'suburb-road-1'
  | 'courthouse-road-1'
  | 'media-road-1'
  | 'politics-road-1'
  | 'suburb-n1' | 'suburb-n2' | 'suburb-n3' | 'suburb-n4'
  | 'courthouse-n1' | 'courthouse-n2' | 'courthouse-n3' | 'courthouse-n4'
  | 'media-n1' | 'media-n2' | 'media-n3' | 'media-n4'
  | 'politics-n1' | 'politics-n2' | 'politics-n3' | 'politics-n4'
  | 'suburb-nr1' | 'suburb-nr2' | 'suburb-nr3' | 'suburb-nr4'
  | 'courthouse-nr1' | 'courthouse-nr2' | 'courthouse-nr3' | 'courthouse-nr4'
  | 'media-nr1' | 'media-nr2' | 'media-nr3' | 'media-nr4'
  | 'politics-nr1' | 'politics-nr2' | 'politics-nr3' | 'politics-nr4';

export interface CommunityCard {
  id: string;
  type: 'community';
  category: CardCategory;
  name: string;
  educationalContent: string;
  effect: string;
  effectType: CommunityCardEffectType;
  effectValue?: number;
  isPowerUp: boolean;
}

export type CommunityCardEffectType =
  | 'meter-plus'
  | 'draw-cards'
  | 'draw-cards-all'
  | 'remove-device-own'
  | 'remove-device-any'
  | 'remove-devices-any'
  | 'remove-all-own'
  | 'cancel-footage-request'
  | 'block-board-phase'
  | 'cancel-next-surveillance'
  | 'cancel-next-incident'
  | 'cancel-next-2-surveillance'
  | 'wildcard-deposit'
  | 'actions-all'
  | 'actions-current'
  | 'move-any'
  | 'move-player-here'
  | 'swap-cards'
  | 'reveal-surveillance'
  | 'reveal-top-surveillance'
  | 'reduced-deposit'
  | 'board-phase-reduced'
  | 'meter-plus-immediate'
  | 'draw-cards-swap'
  | 'none';

export interface IncidentCard {
  id: string;
  type: 'incident';
  name: string;
  effect: string;
  effectType: IncidentEffectType;
  educationalNote: string;
}

export type IncidentEffectType =
  | 'add-devices-to-neighborhood'
  | 'meter-minus'
  | 'police-footage-request'
  | 'add-device-all-neighborhoods'
  | 'neighbor-reports-neighbor'
  | 'government-contract';

export type Card = CommunityCard | IncidentCard;

export interface SurveillanceCard {
  id: string;
  neighborhood: NeighborhoodId;
  slot: SlotIndex;
}

export interface Role {
  id: RoleId;
  name: string;
  homeNeighborhood: NeighborhoodId;
  specialAbility: string;
  color: string;
  emoji: string;
  colorHex: string;
}

export interface Neighborhood {
  id: NeighborhoodId;
  name: string;
  slots: (DeviceType | null)[];
  densityTrack: number;
}

export interface Player {
  id: number;
  role: Role;
  position: Position;
  hand: CommunityCard[];
  hasUsedSpecialAbilityThisTurn: boolean;
}

export type GamePhase =
  | 'setup'
  | 'journalist-preview'
  | 'player-turn'
  | 'board-phase'
  | 'check-phase'
  | 'won'
  | 'lost';

export interface PendingIncident {
  card: IncidentCard;
  voteTally?: { comply: number; refuse: number };
}

export interface GameState {
  phase: GamePhase;
  round: number;
  currentPlayerIndex: number;
  actionsRemaining: number;

  privacyMeter: number;
  densityTracker: number;

  neighborhoods: Neighborhood[];
  players: Player[];

  communityDeck: Card[];
  communityDiscard: Card[];
  surveillanceDeck: SurveillanceCard[];
  surveillanceDiscard: SurveillanceCard[];

  revealedSurveillanceCards: SurveillanceCard[];
  journalistPreviewDone: boolean;

  pendingIncident: PendingIncident | null;
  pendingDrawnCards: { playerId: number; cards: CommunityCard[] } | null;
  pendingDiscard: { playerId: number; count: number } | null;

  blockedBoardPhases: number;
  reducedBoardPhaseRounds: number;
  reducedNextDeposit: boolean;
  cancelNextSurveillance: number;
  cancelNextIncident: boolean;
  pendingExtraActions: number;

  pendingDiceRoll: boolean;
  lastDiceRoll: number | null;

  gameLog: string[];
  lossReason?: string;
}
