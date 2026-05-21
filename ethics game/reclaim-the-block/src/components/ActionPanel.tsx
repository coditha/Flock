import type { GameState, Position, NeighborhoodId, SlotIndex } from '../types/game';
import type { GameAction } from '../store/gameReducer';

interface Props {
  state: GameState;
  selectedCardIds: string[];
  selectedNeighborhood: NeighborhoodId | null;
  selectedSlot: SlotIndex | null;
  dispatch: (action: GameAction) => void;
  onClearSelection: () => void;
}

const MOVE_OPTIONS: { label: string; position: Position }[] = [
  { label: 'Suburb', position: 'suburb' },
  { label: 'Courthouse', position: 'courthouse' },
  { label: 'Media District', position: 'media' },
  { label: 'Politics Row', position: 'politics' },
  { label: 'City Hall', position: 'city-hall' },
  { label: '→ Suburb road 1', position: 'suburb-road-1' },
  { label: '→ Suburb road 2', position: 'suburb-road-2' },
  { label: '→ Courthouse road 1', position: 'courthouse-road-1' },
  { label: '→ Courthouse road 2', position: 'courthouse-road-2' },
  { label: '→ Media road 1', position: 'media-road-1' },
  { label: '→ Media road 2', position: 'media-road-2' },
  { label: '→ Politics road 1', position: 'politics-road-1' },
  { label: '→ Politics road 2', position: 'politics-road-2' },
];

export default function ActionPanel({
  state,
  selectedCardIds,
  selectedNeighborhood,
  selectedSlot,
  dispatch,
  onClearSelection,
}: Props) {
  const { phase, actionsRemaining, currentPlayerIndex, players, pendingIncident } = state;
  const player = players[currentPlayerIndex];
  const actions = actionsRemaining;

  // Helpers
  const canAct = phase === 'player-turn' && actions > 0 && !pendingIncident;
  const selectedCards = player.hand.filter((c) => selectedCardIds.includes(c.id));
  const twoSameColor =
    selectedCards.length >= 2 && selectedCards[0].category === selectedCards[1].category;

  const canRemove =
    canAct &&
    selectedSlot !== null &&
    selectedNeighborhood !== null &&
    twoSameColor &&
    state.neighborhoods.find((n) => n.id === selectedNeighborhood)?.slots[selectedSlot] !== null;

  const canLegalRemove =
    canAct &&
    player.role.id === 'legal' &&
    !player.hasUsedSpecialAbilityThisTurn &&
    selectedCards.length >= 2 &&
    selectedSlot !== null &&
    selectedNeighborhood !== null &&
    state.neighborhoods.find((n) => n.id === selectedNeighborhood)?.slots[selectedSlot] !== null;

  const canDeposit =
    canAct &&
    player.position === 'city-hall' &&
    selectedCards.length >= (player.role.id === 'council' ? 4 : 5);

  const canPlayCard =
    canAct &&
    selectedCards.length === 1 &&
    selectedCards[0].isPowerUp;

  return (
    <div className="action-panel">
      <div className="action-header">
        <span className="phase-badge">{getPhaseName(phase)}</span>
        {phase === 'player-turn' && (
          <span className="actions-remaining">
            ⚡ {actions} action{actions !== 1 ? 's' : ''} remaining
          </span>
        )}
      </div>

      {/* Incident resolution */}
      {pendingIncident && (
        <div className="incident-box">
          <div className="incident-title">⚠️ INCIDENT: {pendingIncident.card.name}</div>
          <div className="incident-effect">{pendingIncident.card.effect}</div>
          <div className="incident-edu">{pendingIncident.card.educationalNote}</div>
          {pendingIncident.card.effectType === 'police-footage-request' ? (
            <div className="incident-vote">
              <p>Vote: Comply (meter -3) or Refuse (meter -2)?</p>
              <button className="btn btn-danger" onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'comply' })}>
                Comply (−3)
              </button>
              <button className="btn btn-warning" onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse' })}>
                Refuse (−2)
              </button>
            </div>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse' })}
            >
              Resolve Incident
            </button>
          )}
        </div>
      )}

      {/* Journalist preview */}
      {phase === 'journalist-preview' && !pendingIncident && (
        <div className="phase-box">
          <p>
            {players.find((p) => p.role.id === 'journalist')
              ? `The Journalist (${players.find((p) => p.role.id === 'journalist')!.role.emoji}) may preview the top 2 Surveillance Cards.`
              : 'No Journalist in this game — proceed to Player Phase.'}
          </p>
          {!state.journalistPreviewDone && players.find((p) => p.role.id === 'journalist') && (
            <button
              className="btn btn-primary"
              onClick={() => dispatch({ type: 'JOURNALIST_PREVIEW_DONE' })}
            >
              Journalist Previews Cards
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: 'JOURNALIST_PREVIEW_DONE' })}
          >
            Start Player Phase
          </button>
        </div>
      )}

      {/* Board phase */}
      {phase === 'board-phase' && !pendingIncident && (
        <div className="phase-box">
          <p>All players have taken their turns. Time to place the next surveillance device.</p>
          <button className="btn btn-danger" onClick={() => dispatch({ type: 'BOARD_PHASE' })}>
            Run Board Phase
          </button>
        </div>
      )}

      {/* Player turn actions */}
      {phase === 'player-turn' && !pendingIncident && (
        <div className="action-buttons">
          {/* Move */}
          <div className="action-group">
            <div className="action-group-label">Move (1 action each)</div>
            <div className="move-buttons">
              {MOVE_OPTIONS.map(({ label, position }) => (
                <button
                  key={position}
                  className={`btn btn-move ${player.position === position ? 'current-pos' : ''}`}
                  disabled={!canAct || player.position === position}
                  onClick={() => dispatch({ type: 'MOVE', to: position })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Remove device */}
          <div className="action-group">
            <div className="action-group-label">Remove Device (1 action + 2 same-color cards)</div>
            <p className="action-hint">
              Select 2 same-color cards from hand, then click a device slot on the board.
            </p>
            <button
              className="btn btn-action"
              disabled={!canRemove}
              onClick={() => {
                if (!canRemove) return;
                dispatch({
                  type: 'REMOVE_DEVICE',
                  neighborhoodId: selectedNeighborhood!,
                  slotIndex: selectedSlot!,
                  cardIds: [selectedCardIds[0], selectedCardIds[1]] as [string, string],
                });
                onClearSelection();
              }}
            >
              🗑️ Remove Device {selectedNeighborhood && selectedSlot !== null ? `(${selectedNeighborhood} slot ${selectedSlot + 1})` : ''}
            </button>
          </div>

          {/* Legal Advocate special */}
          {player.role.id === 'legal' && (
            <div className="action-group">
              <div className="action-group-label">⚖️ Legal Advocate: Remove Any (2 any cards)</div>
              <button
                className="btn btn-special"
                disabled={!canLegalRemove}
                onClick={() => {
                  if (!canLegalRemove) return;
                  dispatch({
                    type: 'LEGAL_REMOVE_DEVICE',
                    neighborhoodId: selectedNeighborhood!,
                    slotIndex: selectedSlot!,
                    cardIds: [selectedCardIds[0], selectedCardIds[1]] as [string, string],
                  });
                  onClearSelection();
                }}
              >
                Remove device with any 2 cards
              </button>
            </div>
          )}

          {/* Deposit at City Hall */}
          <div className="action-group">
            <div className="action-group-label">
              🏛️ Deposit at City Hall (1 action + {player.role.id === 'council' ? '4' : '5'} cards, one per color)
            </div>
            <p className="action-hint">
              {player.position !== 'city-hall'
                ? 'Must be at City Hall.'
                : `Select ${player.role.id === 'council' ? '4' : '5'} cards (one per color) from hand.`}
            </p>
            <button
              className="btn btn-deposit"
              disabled={!canDeposit}
              onClick={() => {
                if (!canDeposit) return;
                dispatch({
                  type: 'DEPOSIT_AT_CITY_HALL',
                  cardIds: selectedCardIds.slice(0, player.role.id === 'council' ? 4 : 5),
                });
                onClearSelection();
              }}
            >
              🏛️ Deposit Cards
            </button>
          </div>

          {/* Play power-up card */}
          <div className="action-group">
            <div className="action-group-label">⭐ Play Power-Up Card (1 action)</div>
            <p className="action-hint">Select a ⭐ power-up card from your hand.</p>
            <button
              className="btn btn-powerup"
              disabled={!canPlayCard}
              onClick={() => {
                if (!canPlayCard) return;
                dispatch({
                  type: 'PLAY_CARD',
                  cardId: selectedCards[0].id,
                  targetNeighborhoodId: selectedNeighborhood ?? undefined,
                  targetSlotIndex: selectedSlot ?? undefined,
                });
                onClearSelection();
              }}
            >
              ⭐ Play Card
            </button>
          </div>

          {/* Special ability */}
          {(player.role.id === 'organizer' || player.role.id === 'journalist') && (
            <div className="action-group">
              <div className="action-group-label">{player.role.emoji} Use Special Ability (1 action)</div>
              <button
                className="btn btn-special"
                disabled={!canAct || player.hasUsedSpecialAbilityThisTurn}
                onClick={() => dispatch({ type: 'USE_SPECIAL_ABILITY' })}
              >
                {player.hasUsedSpecialAbilityThisTurn ? 'Used this turn' : 'Activate Ability'}
              </button>
            </div>
          )}

          {/* End turn */}
          <div className="action-group">
            <button
              className="btn btn-end-turn"
              onClick={() => {
                dispatch({ type: 'END_TURN' });
                onClearSelection();
              }}
            >
              End Turn (draw 2 cards)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getPhaseName(phase: string): string {
  switch (phase) {
    case 'journalist-preview': return 'Journalist Preview';
    case 'player-turn': return 'Player Turn';
    case 'board-phase': return 'Board Phase';
    case 'check-phase': return 'Check Phase';
    case 'won': return 'Victory!';
    case 'lost': return 'Defeated';
    default: return phase;
  }
}
