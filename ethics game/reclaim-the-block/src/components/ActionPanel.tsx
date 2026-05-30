import { useState, useRef } from 'react';
import type { GameState, NeighborhoodId, SlotIndex } from '../types/game';
import type { GameAction } from '../store/gameReducer';

interface Props {
  state: GameState;
  selectedCardIds: string[];
  selectedNeighborhood: NeighborhoodId | null;
  selectedSlot: SlotIndex | null;
  dispatch: (action: GameAction) => void;
  onClearSelection: () => void;
}

interface ActionBtn {
  id: string;
  icon: string;
  label: string;
  tooltip: string;
  available: boolean;
  onTap: () => void;
}

const DICE_FACES: Record<number, string> = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };
const NHCOLOR: Record<string, string> = { suburb: 'yellow', courthouse: 'blue', media: 'green', politics: 'red' };

export default function ActionPanel({
  state, selectedCardIds, selectedNeighborhood, selectedSlot, dispatch, onClearSelection,
}: Props) {
  const { phase, actionsRemaining, currentPlayerIndex, players, pendingIncident, pendingDiscard } = state;
  const player = players[currentPlayerIndex];
  const actions = actionsRemaining;

  // ── Hold-for-tooltip state ───────────────────────────────────────────────
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipShown = useRef(false);

  function startHold(id: string) {
    tooltipShown.current = false;
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => {
      tooltipShown.current = true;
      setActiveTooltip(id);
    }, 380);
  }

  function endHold() {
    if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null; }
    setActiveTooltip(null);
    // reset on next frame so the onClick check still sees the old value
    requestAnimationFrame(() => { tooltipShown.current = false; });
  }

  // ── Action availability ──────────────────────────────────────────────────
  const canAct = phase === 'player-turn' && actions > 0 && !pendingIncident;
  const selectedCards = player.hand.filter((c) => selectedCardIds.includes(c.id));
  const twoSameColor = selectedCards.length >= 2 && selectedCards[0].category === selectedCards[1].category;
  const cardsMatchNeighborhood =
    selectedNeighborhood !== null &&
    selectedCards.length >= 2 &&
    selectedCards[0].category === NHCOLOR[selectedNeighborhood];
  const playerInSelectedNeighborhood =
    selectedNeighborhood !== null &&
    (player.position === selectedNeighborhood || player.position.startsWith(`${selectedNeighborhood}-n`));

  const canRemove =
    canAct && playerInSelectedNeighborhood && selectedSlot !== null && selectedNeighborhood !== null &&
    twoSameColor && cardsMatchNeighborhood &&
    state.neighborhoods.find((n) => n.id === selectedNeighborhood)?.slots[selectedSlot] !== null;

  const canLegalRemove =
    canAct && playerInSelectedNeighborhood && player.role.id === 'legal' &&
    !player.hasUsedSpecialAbilityThisTurn && selectedCards.length >= 2 &&
    selectedSlot !== null && selectedNeighborhood !== null &&
    state.neighborhoods.find((n) => n.id === selectedNeighborhood)?.slots[selectedSlot] !== null;

  const depositRequired = (player.role.id === 'council' || state.reducedNextDeposit) ? 4 : 5;
  const depositCards = selectedCards.slice(0, depositRequired);
  const depositColors = new Set(depositCards.map((c) => c.category));
  const depositWildcards = depositCards.filter((c) => c.effectType === 'wildcard-deposit').length;
  const canDeposit =
    canAct && player.position === 'city-hall' &&
    selectedCards.length >= depositRequired &&
    depositColors.size + depositWildcards >= depositRequired;

  const canPlayCard = canAct && selectedCards.length === 1 && selectedCards[0].isPowerUp;
  const canSpecial = canAct && !player.hasUsedSpecialAbilityThisTurn;

  // ── Action button definitions ────────────────────────────────────────────
  const nhColorNeeded = selectedNeighborhood ? NHCOLOR[selectedNeighborhood] : null;

  const actionButtons: ActionBtn[] = [
    {
      id: 'remove',
      icon: '🗑️',
      label: 'Remove Device',
      tooltip: [
        'Cost: 1 action + 2 matching-color cards.',
        'You must be inside the neighborhood.',
        'Color key:',
        'Suburb → yellow   Courthouse → blue',
        'Media → green     Politics → red',
        nhColorNeeded
          ? `Currently need: 2 ${nhColorNeeded} cards.`
          : 'Select a neighborhood + device slot first.',
      ].join('\n'),
      available: canRemove,
      onTap: () => {
        dispatch({
          type: 'REMOVE_DEVICE',
          neighborhoodId: selectedNeighborhood!,
          slotIndex: selectedSlot!,
          cardIds: [selectedCardIds[0], selectedCardIds[1]] as [string, string],
        });
        onClearSelection();
      },
    },
    {
      id: 'deposit',
      icon: '🏛️',
      label: 'Deposit',
      tooltip: [
        `Cost: 1 action + ${depositRequired} unique-color cards.`,
        'Must be at City Hall.',
        player.role.id === 'council'
          ? 'Council bonus: any 4 different colors.'
          : 'Need one of each: blue · yellow · green · red · purple.',
        'Raises the Privacy & Community Trust Meter.',
      ].join('\n'),
      available: canDeposit,
      onTap: () => {
        dispatch({ type: 'DEPOSIT_AT_CITY_HALL', cardIds: selectedCardIds.slice(0, depositRequired) });
        onClearSelection();
      },
    },
    {
      id: 'playcard',
      icon: '⭐',
      label: 'Play Card',
      tooltip: [
        'Cost: 1 action.',
        'Select exactly one ⭐ power-up card from your hand.',
        'Power-up cards have special team effects.',
        'Tap a card to select it, then tap Play Card.',
      ].join('\n'),
      available: canPlayCard,
      onTap: () => {
        dispatch({
          type: 'PLAY_CARD',
          cardId: selectedCards[0].id,
          targetNeighborhoodId: selectedNeighborhood ?? undefined,
          targetSlotIndex: selectedSlot ?? undefined,
        });
        onClearSelection();
      },
    },
    ...(player.role.id === 'legal' ? [{
      id: 'legal',
      icon: '⚖️',
      label: 'Legal Remove',
      tooltip: [
        'Cost: 1 action + any 2 cards (once per turn).',
        'Legal Advocate special ability.',
        'Remove any device — no color matching required.',
        'Select any 2 cards and a device slot.',
      ].join('\n'),
      available: canLegalRemove,
      onTap: () => {
        dispatch({
          type: 'LEGAL_REMOVE_DEVICE',
          neighborhoodId: selectedNeighborhood!,
          slotIndex: selectedSlot!,
          cardIds: [selectedCardIds[0], selectedCardIds[1]] as [string, string],
        });
        onClearSelection();
      },
    } as ActionBtn] : []),
    ...((player.role.id === 'organizer' || player.role.id === 'journalist') ? [{
      id: 'special',
      icon: player.role.emoji,
      label: 'Special',
      tooltip: [
        'Cost: 1 action (once per turn).',
        player.role.specialAbility,
      ].join('\n'),
      available: canSpecial,
      onTap: () => dispatch({ type: 'USE_SPECIAL_ABILITY' }),
    } as ActionBtn] : []),
  ];

  // Tooltip lookup including End Turn
  const tooltipMap: Record<string, { icon: string; label: string; tooltip: string }> = {};
  actionButtons.forEach((b) => { tooltipMap[b.id] = b; });
  tooltipMap['endturn'] = {
    icon: '✅',
    label: 'End Turn',
    tooltip: 'Draw 2 community cards and pass the turn.\nNo action cost — always available.',
  };

  const tooltipEntry = activeTooltip ? tooltipMap[activeTooltip] : null;

  return (
    <div className="ap-wrap">

      {/* ── Header: role, dice, actions ─────────────────────── */}
      <div className="ap-header" style={{ background: player.role.colorHex }}>
        <span className="ap-role-name">{player.role.emoji} {player.role.name}</span>
        <div className="ap-header-right">
          {phase === 'player-turn' && !state.pendingDiceRoll && state.lastDiceRoll !== null && (
            <span className="ap-chip ap-chip-dice">{DICE_FACES[state.lastDiceRoll]} {state.lastDiceRoll}</span>
          )}
          {phase === 'player-turn' && !state.pendingDiceRoll && (
            <span className="ap-chip ap-chip-actions">⚡ {actions}</span>
          )}
        </div>
      </div>

      {/* ── Incident resolution ─────────────────────────────── */}
      {pendingIncident && (
        <div className="ap-incident">
          <div className="ap-incident-title">⚠️ {pendingIncident.card.name}</div>
          <div className="ap-incident-effect">{pendingIncident.card.effect}</div>
          <div className="ap-incident-edu">{pendingIncident.card.educationalNote}</div>
          {pendingIncident.card.effectType === 'neighbor-reports-neighbor' ? (
            player.hand.length > 0 ? (
              <>
                <div className="ap-discard-label">Discard a card:</div>
                <div className="ap-discard-options">
                  {player.hand.map((card) => (
                    <button key={card.id} className="btn btn-discard-choice"
                      onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse', discardCardId: card.id })}>
                      <span className={`card-dot cat-${card.category}`} />{card.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <button className="btn btn-danger"
                onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse' })}>
                Acknowledge
              </button>
            )
          ) : (
            <button className="btn btn-danger"
              onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse' })}>
              Acknowledge
            </button>
          )}
        </div>
      )}

      {/* ── Hand limit discard ──────────────────────────────── */}
      {pendingDiscard && (
        <div className="ap-incident">
          <div className="ap-incident-title">✋ Hand Limit Reached</div>
          <div className="ap-incident-effect">
            Select {pendingDiscard.count} card{pendingDiscard.count > 1 ? 's' : ''} to discard.
            ({selectedCardIds.length}/{pendingDiscard.count} selected)
          </div>
          <button className="btn btn-danger"
            disabled={selectedCardIds.length !== pendingDiscard.count}
            onClick={() => { dispatch({ type: 'DISCARD_TO_HAND_LIMIT', cardIds: selectedCardIds }); onClearSelection(); }}>
            Confirm Discard
          </button>
        </div>
      )}

      {/* ── Journalist preview ──────────────────────────────── */}
      {phase === 'journalist-preview' && !pendingIncident && (
        <div className="ap-phase-box">
          <p>
            {players.find((p) => p.role.id === 'journalist')
              ? 'The Journalist may preview the top 2 Surveillance Cards before play begins.'
              : 'No Journalist in this game — proceed to player turns.'}
          </p>
          <button className="btn btn-primary"
            onClick={() => dispatch({ type: 'JOURNALIST_PREVIEW_DONE' })}>
            {!state.journalistPreviewDone && players.find((p) => p.role.id === 'journalist')
              ? 'Journalist Previews Cards'
              : 'Start Player Phase'}
          </button>
        </div>
      )}

      {/* ── Board phase ─────────────────────────────────────── */}
      {phase === 'board-phase' && !pendingIncident && (
        <div className="ap-phase-box">
          <p>All players have taken their turns. Place the next surveillance device.</p>
          <button className="btn btn-danger" onClick={() => dispatch({ type: 'BOARD_PHASE' })}>
            Run Board Phase
          </button>
        </div>
      )}

      {/* ── Dice roll ───────────────────────────────────────── */}
      {phase === 'player-turn' && state.pendingDiceRoll && !pendingIncident && (
        <div className="ap-dice-roll">
          <div className="ap-dice-prompt">🎲 Roll to start your turn!</div>
          <button className="btn btn-roll" onClick={() => dispatch({ type: 'ROLL_DIE' })}>
            🎲 Roll Dice
          </button>
        </div>
      )}

      {/* ── Action grid (Layer 1 + 2) ────────────────────────── */}
      {phase === 'player-turn' && !state.pendingDiceRoll && !pendingIncident && !pendingDiscard && (
        <div className="ap-body">

          {/* Layer 2: tooltip (shown while holding any button) */}
          {tooltipEntry && (
            <div className="ap-tooltip">
              <div className="ap-tooltip-title">{tooltipEntry.icon} {tooltipEntry.label}</div>
              {tooltipEntry.tooltip.split('\n').map((line, i) => (
                <div key={i} className="ap-tooltip-line">{line || <>&nbsp;</>}</div>
              ))}
            </div>
          )}

          {/* Layer 1: action button grid */}
          <div className="ap-grid">
            {actionButtons.map((btn) => (
              <button
                key={btn.id}
                className={`ap-action-btn${btn.available ? '' : ' ap-disabled'}`}
                onPointerDown={() => startHold(btn.id)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                onClick={() => { if (!tooltipShown.current && btn.available) btn.onTap(); }}
              >
                <span className="ap-btn-icon">{btn.icon}</span>
                <span className="ap-btn-label">{btn.label}</span>
              </button>
            ))}
          </div>

          {/* End Turn — always last, largest button */}
          <button
            className="ap-end-turn"
            onPointerDown={() => startHold('endturn')}
            onPointerUp={endHold}
            onPointerLeave={endHold}
            onPointerCancel={endHold}
            onClick={() => { if (!tooltipShown.current) { dispatch({ type: 'END_TURN' }); onClearSelection(); } }}
          >
            ✅ End Turn
            <span className="ap-end-sub">draw 2 cards</span>
          </button>
        </div>
      )}
    </div>
  );
}
