import { useReducer, useState, useCallback, useEffect, useRef } from 'react';
import { gameReducer, buildInitialState, getReachablePositions } from './store/gameReducer';
import type { GameAction } from './store/gameReducer';
import type { NeighborhoodId, SlotIndex, CommunityCard, Player, GameState } from './types/game';
import GameSetup from './components/GameSetup';
import GameOver from './components/GameOver';
import PrivacyMeter from './components/PrivacyMeter';
import DensityTracker from './components/DensityTracker';
import NeighborhoodTile from './components/NeighborhoodTile';
import CardDisplay from './components/CardDisplay';
import ActionPanel from './components/ActionPanel';
import GameLog from './components/GameLog';
import RevealedCards from './components/RevealedCards';

// ── Corner hand tray ───────────────────────────────────────────────────────

function CornerPanel({
  player,
  isActive,
  selectedCardIds,
  onCardClick,
}: {
  player: Player;
  isActive: boolean;
  selectedCardIds: string[];
  onCardClick: (card: CommunityCard) => void;
}) {
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

  const POSITION_SHORT: Record<string, string> = {
    'city-hall': 'City Hall',
    suburb: 'Suburb', courthouse: 'Courthouse', media: 'Media', politics: 'Politics',
    'suburb-n1': 'Sub N1', 'suburb-n2': 'Sub N2', 'suburb-n3': 'Sub N3', 'suburb-n4': 'Sub N4',
    'courthouse-n1': 'Court N1', 'courthouse-n2': 'Court N2', 'courthouse-n3': 'Court N3', 'courthouse-n4': 'Court N4',
    'media-n1': 'Med N1', 'media-n2': 'Med N2', 'media-n3': 'Med N3', 'media-n4': 'Med N4',
    'politics-n1': 'Pol N1', 'politics-n2': 'Pol N2', 'politics-n3': 'Pol N3', 'politics-n4': 'Pol N4',
    'suburb-road-1': 'Sub Road', 'courthouse-road-1': 'Court Road',
    'media-road-1': 'Med Road', 'politics-road-1': 'Pol Road',
  };

  // Horizontal overlap layout: cards spread evenly, overlap increases with hand size
  const n = player.hand.length;
  const CARD_W = 124; // px, fixed — never shrinks

  return (
    <div
      className={`corner-panel ${isActive ? 'corner-active' : ''}`}
      style={{ borderColor: player.role.colorHex }}
    >
      <div className="corner-header" style={{ background: player.role.colorHex }}>
        <span className="corner-emoji">{player.role.emoji}</span>
        <div className="corner-info">
          <span className="corner-name">{player.role.name}</span>
          <span className="corner-pos">📍 {POSITION_SHORT[player.position] ?? player.position}</span>
        </div>
        <span className="corner-hand-count">{player.hand.length}/7</span>
        {isActive && <span className="corner-active-badge">⚡ ACTIVE</span>}
      </div>
      <div className="corner-hand">
        {n === 0 ? (
          <span className="corner-empty">No cards in hand</span>
        ) : (
          player.hand.map((card, i) => {
            const isFocused = focusedCardId === card.id;
            // Spread cards evenly across the container width using CSS calc.
            // As n grows the step shrinks → overlap increases, no scroll needed.
            const left = n === 1
              ? `calc(50% - ${CARD_W / 2}px)`
              : `calc((100% - ${CARD_W}px) * ${i / (n - 1)})`;
            return (
              <div
                key={card.id}
                className={`fan-card-wrap${isFocused ? ' fan-focused' : ''}`}
                style={{
                  left,
                  zIndex: isFocused ? 30 : i + 1,
                }}
              >
                <CardDisplay
                  card={card}
                  isSelected={selectedCardIds.includes(card.id)}
                  onClick={() => {
                    setFocusedCardId(focusedCardId === card.id ? null : card.id);
                    onCardClick(card);
                  }}
                  disabled={!isActive}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Surveillance incident overlay ──────────────────────────────────────────

function IncidentOverlay({
  incident,
  player,
  dispatch,
}: {
  incident: import('./types/game').PendingIncident;
  player: Player;
  dispatch: (a: GameAction) => void;
}) {
  return (
    <div className="incident-overlay">
      <div className="incident-flash" />
      <div className="incident-card">
        {/* Card header band */}
        <div className="incident-card-header">
          <span className="incident-card-type-label">⚠ SURVEILLANCE INCIDENT</span>
        </div>

        {/* Art zone */}
        <div className="incident-card-art">
          <span className="incident-card-art-icon">📡</span>
        </div>

        {/* Inner frame body */}
        <div className="incident-card-body">
          <div className="incident-card-name">{incident.card.name}</div>
          <div className="incident-card-flavor">{incident.card.educationalNote}</div>
          <div className="incident-card-rule">{incident.card.effect}</div>
        </div>

        {/* Action footer */}
        <div className="incident-card-footer">
          {incident.card.effectType === 'neighbor-reports-neighbor' && player.hand.length > 0 ? (
            <>
              <div className="incident-card-discard-label">Discard a card to resolve:</div>
              <div className="incident-card-discard-options">
                {player.hand.map((card) => (
                  <button key={card.id} className="btn btn-discard-choice"
                    onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse', discardCardId: card.id })}>
                    <span className={`card-dot cat-${card.category}`} />{card.name}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button className="btn btn-danger incident-card-btn"
              onClick={() => dispatch({ type: 'INCIDENT_VOTE', choice: 'refuse' })}>
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Turn action popup ───────────────────────────────────────────────────────

function TurnPopup({
  position,
  roleId,
  state,
  selectedCardIds,
  selectedNeighborhood,
  selectedSlot,
  dispatch,
  onClearSelection,
}: {
  position: 'bl' | 'br' | 'tl' | 'tr';
  roleId: string;
  state: GameState;
  selectedCardIds: string[];
  selectedNeighborhood: NeighborhoodId | null;
  selectedSlot: SlotIndex | null;
  dispatch: (action: GameAction) => void;
  onClearSelection: () => void;
}) {
  const activeRole = state.players[state.currentPlayerIndex]?.role.id;
  const isActive = activeRole === roleId && state.phase !== 'won' && state.phase !== 'lost';
  const [show, setShow] = useState(isActive);
  const [anim, setAnim] = useState<'popup-enter' | 'popup-exit'>(isActive ? 'popup-enter' : 'popup-exit');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isActive) {
      setShow(true);
      setAnim('popup-enter');
    } else {
      setAnim('popup-exit');
      timerRef.current = setTimeout(() => setShow(false), 400);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isActive]);

  if (!show) return null;
  const isTop = position === 'tl' || position === 'tr';

  return (
    <div className={`turn-popup turn-popup-${position} ${anim}`}>
      <div className={`popup-inner${isTop ? ' popup-inner-rotated' : ''}`}>
        <ActionPanel
          state={state}
          selectedCardIds={selectedCardIds}
          selectedNeighborhood={selectedNeighborhood}
          selectedSlot={selectedSlot}
          dispatch={dispatch}
          onClearSelection={onClearSelection}
        />
      </div>
    </div>
  );
}

// ── Game screen ────────────────────────────────────────────────────────────

interface GameScreenProps {
  playerCount: 2 | 3 | 4;
  onRestart: () => void;
}

function GameScreen({ playerCount, onRestart }: GameScreenProps) {
  const [state, dispatch] = useReducer(gameReducer, playerCount, buildInitialState);

  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodId | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotIndex | null>(null);
  const [showLog, setShowLog] = useState(false);

  const handleCardClick = useCallback((card: CommunityCard) => {
    setSelectedCardIds((prev) =>
      prev.includes(card.id) ? prev.filter((id) => id !== card.id) : [...prev, card.id]
    );
  }, []);

  const handleNeighborhoodSelect = useCallback((id: NeighborhoodId) => {
    setSelectedNeighborhood((prev) => (prev === id ? null : id));
    setSelectedSlot(null);
  }, []);

  const handleSlotClick = useCallback((neighborhoodId: NeighborhoodId, slot: SlotIndex) => {
    setSelectedNeighborhood(neighborhoodId);
    setSelectedSlot((prev) => (prev === slot ? null : slot));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCardIds([]);
    setSelectedNeighborhood(null);
    setSelectedSlot(null);
  }, []);

  const handleMove = useCallback(
    (position: import('./types/game').Position) => {
      dispatch({ type: 'MOVE', to: position });
    },
    [dispatch]
  );

  const canMove =
    state.phase === 'player-turn' &&
    !state.pendingDiceRoll &&
    !state.pendingIncident &&
    state.actionsRemaining > 0;

  if (state.phase === 'won' || state.phase === 'lost') {
    return (
      <GameOver
        won={state.phase === 'won'}
        reason={state.lossReason}
        round={state.round}
        privacyMeter={state.privacyMeter}
        onRestart={onRestart}
      />
    );
  }

  const activePlayer = state.players[state.currentPlayerIndex];
  const reachablePositions = canMove ? getReachablePositions(activePlayer.position) : [];
  const reachable = (pos: import('./types/game').Position) => reachablePositions.includes(pos);

  // Role → corner mapping
  const byRole = (id: string): Player | undefined =>
    state.players.find((p) => p.role.id === id);
  const organizerPlayer = byRole('organizer');
  const legalPlayer     = byRole('legal');
  const captainPlayer   = byRole('captain');
  const councilPlayer   = byRole('council');

  const isActive = (p?: Player) => !!p && p.id === activePlayer.id;
  const selFor   = (p?: Player) => (isActive(p) ? selectedCardIds : []);
  const clickFor = (p?: Player) => (isActive(p) ? handleCardClick : () => {});

  return (
    <div className="tv-game">

      {/* ── TOP-LEFT: Community Organizer (rotated 180°) ─────── */}
      <div className="tv-corner corner-tl">
        {organizerPlayer ? (
          <CornerPanel
            player={organizerPlayer}
            isActive={isActive(organizerPlayer)}
            selectedCardIds={selFor(organizerPlayer)}
            onCardClick={clickFor(organizerPlayer)}
          />
        ) : (
          <div className="corner-empty-slot">No player</div>
        )}
      </div>

      {/* ── LEFT SIDE: empty (log moved to top-bar button) ────── */}
      <div className="tv-pm side-tracker" />

      {/* ── TOP CENTER: Title bar + Revealed cards ────────────── */}
      <div className="tv-top-center">
        <div className="tv-top-bar">
          <div className="game-title">RECLAIM THE BLOCK</div>
          <div className="round-info">
            Round {state.round} — {activePlayer.role.emoji} {activePlayer.role.name}'s turn
          </div>
          <div className="tv-top-actions">
            <button
              className={`btn-quit btn-log ${showLog ? 'active' : ''}`}
              onClick={() => setShowLog((s) => !s)}
            >
              📜 Log
            </button>
            <button className="btn-quit" onClick={onRestart}>← New Game</button>
          </div>
        </div>
        {/* Shared trackers — attached to the round-info header (same state as bottom set) */}
        <div className="board-trackers board-trackers-header">
          <PrivacyMeter value={state.privacyMeter} vertical blocked={!!state.pendingIncident} />
          <DensityTracker value={state.densityTracker} vertical blocked={!!state.pendingIncident} />
        </div>
        <RevealedCards cards={state.revealedSurveillanceCards} />
      </div>

      {/* ── Game Log dropdown — expands in place under the Log button ── */}
      {showLog && (
        <div className="log-dropdown">
          <div className="log-dropdown-title">📜 Game Log</div>
          <GameLog log={state.gameLog} />
        </div>
      )}

      {/* ── TOP-RIGHT: Neighborhood Captain (rotated 180°) ────── */}
      <div className="tv-corner corner-tr">
        {captainPlayer ? (
          <CornerPanel
            player={captainPlayer}
            isActive={isActive(captainPlayer)}
            selectedCardIds={selFor(captainPlayer)}
            onCardClick={clickFor(captainPlayer)}
          />
        ) : (
          <div className="corner-empty-slot">No player</div>
        )}
      </div>

      {/* ── CENTER BOARD ──────────────────────────────────────── */}
      <div className="tv-board-zone">
        <div className="board-area">
          <div className="board-grid">
            <div className="board-n1">
              <NeighborhoodTile
                neighborhood={state.neighborhoods[0]}
                players={state.players}
                isSelected={selectedNeighborhood === 'suburb'}
                onSelect={() => handleNeighborhoodSelect('suburb')}
                onSlotClick={(slot) => handleSlotClick('suburb', slot)}
                selectedSlot={selectedNeighborhood === 'suburb' ? selectedSlot : null}
                canMove={canMove}
                activePlayerPosition={activePlayer.position}
                onMove={handleMove}
              />
            </div>

            <div className="board-roads-top">
              <div className="road-segment-v">
                <div className="road-line-v" />
                <div
                  className={`road-waypoint${activePlayer.position === 'suburb-road-1' ? ' active-player-here' : ''}${reachable('suburb-road-1') ? ' moveable' : ''}`}
                  onClick={() => { if (reachable('suburb-road-1')) handleMove('suburb-road-1'); }}
                >
                  {state.players.filter((p) => p.position === 'suburb-road-1').map((p) => (
                    <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                  ))}
                </div>
                <div className="road-line-v" />
              </div>
            </div>

            <div className="board-middle">
              <NeighborhoodTile
                neighborhood={state.neighborhoods[1]}
                players={state.players}
                isSelected={selectedNeighborhood === 'courthouse'}
                onSelect={() => handleNeighborhoodSelect('courthouse')}
                onSlotClick={(slot) => handleSlotClick('courthouse', slot)}
                selectedSlot={selectedNeighborhood === 'courthouse' ? selectedSlot : null}
                canMove={canMove}
                activePlayerPosition={activePlayer.position}
                onMove={handleMove}
              />
              <div className="city-hall-area">
                <div className="road-segment-h">
                  <div className="road-line-h" />
                  <div
                    className={`road-waypoint${activePlayer.position === 'courthouse-road-1' ? ' active-player-here' : ''}${reachable('courthouse-road-1') ? ' moveable' : ''}`}
                    onClick={() => { if (reachable('courthouse-road-1')) handleMove('courthouse-road-1'); }}
                  >
                    {state.players.filter((p) => p.position === 'courthouse-road-1').map((p) => (
                      <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                    ))}
                  </div>
                  <div className="road-line-h" />
                </div>
                <div
                  className={`city-hall ${state.players.some((p) => p.position === 'city-hall') ? 'has-players' : ''} ${reachable('city-hall') ? 'moveable' : ''} ${activePlayer.position === 'city-hall' ? 'active-player-here' : ''}`}
                  onClick={() => { if (reachable('city-hall')) handleMove('city-hall'); }}
                >
                  <div className="city-hall-label">🏛️ CITY HALL</div>
                  <div className="city-hall-sublabel">Deposit Zone</div>
                  <div className="city-hall-players">
                    {state.players.filter((p) => p.position === 'city-hall').map((p) => (
                      <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                    ))}
                  </div>
                </div>
                <div className="road-segment-h">
                  <div className="road-line-h" />
                  <div
                    className={`road-waypoint${activePlayer.position === 'media-road-1' ? ' active-player-here' : ''}${reachable('media-road-1') ? ' moveable' : ''}`}
                    onClick={() => { if (reachable('media-road-1')) handleMove('media-road-1'); }}
                  >
                    {state.players.filter((p) => p.position === 'media-road-1').map((p) => (
                      <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                    ))}
                  </div>
                  <div className="road-line-h" />
                </div>
              </div>
              <NeighborhoodTile
                neighborhood={state.neighborhoods[2]}
                players={state.players}
                isSelected={selectedNeighborhood === 'media'}
                onSelect={() => handleNeighborhoodSelect('media')}
                onSlotClick={(slot) => handleSlotClick('media', slot)}
                selectedSlot={selectedNeighborhood === 'media' ? selectedSlot : null}
                canMove={canMove}
                activePlayerPosition={activePlayer.position}
                onMove={handleMove}
              />
            </div>

            <div className="board-roads-bottom">
              <div className="road-segment-v">
                <div className="road-line-v" />
                <div
                  className={`road-waypoint${activePlayer.position === 'politics-road-1' ? ' active-player-here' : ''}${reachable('politics-road-1') ? ' moveable' : ''}`}
                  onClick={() => { if (reachable('politics-road-1')) handleMove('politics-road-1'); }}
                >
                  {state.players.filter((p) => p.position === 'politics-road-1').map((p) => (
                    <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                  ))}
                </div>
                <div className="road-line-v" />
              </div>
            </div>

            <div className="board-n4">
              <NeighborhoodTile
                neighborhood={state.neighborhoods[3]}
                players={state.players}
                isSelected={selectedNeighborhood === 'politics'}
                onSelect={() => handleNeighborhoodSelect('politics')}
                onSlotClick={(slot) => handleSlotClick('politics', slot)}
                selectedSlot={selectedNeighborhood === 'politics' ? selectedSlot : null}
                canMove={canMove}
                activePlayerPosition={activePlayer.position}
                onMove={handleMove}
              />
            </div>
          </div>
        </div>

        {/* Shared trackers — bottom edge (duplicate of top set, same state) */}
        <div className="board-trackers board-trackers-bottom">
          <PrivacyMeter value={state.privacyMeter} vertical blocked={!!state.pendingIncident} />
          <DensityTracker value={state.densityTracker} vertical blocked={!!state.pendingIncident} />
        </div>
      </div>

      {/* ── RIGHT SIDE: (trackers moved to board edges) ───────── */}
      <div className="tv-dt side-tracker" />

      {/* ── BOTTOM-LEFT: Legal Advocate ───────────────────────── */}
      <div className="tv-corner corner-bl">
        {legalPlayer ? (
          <CornerPanel
            player={legalPlayer}
            isActive={isActive(legalPlayer)}
            selectedCardIds={selFor(legalPlayer)}
            onCardClick={clickFor(legalPlayer)}
          />
        ) : (
          <div className="corner-empty-slot">No player</div>
        )}
      </div>

      {/* ── BOTTOM-RIGHT: Council Member ──────────────────────── */}
      <div className="tv-corner corner-br">
        {councilPlayer ? (
          <CornerPanel
            player={councilPlayer}
            isActive={isActive(councilPlayer)}
            selectedCardIds={selFor(councilPlayer)}
            onCardClick={clickFor(councilPlayer)}
          />
        ) : (
          <div className="corner-empty-slot">No player</div>
        )}
      </div>

      {/* ── Per-player action popups ─────────────────────────── */}
      {organizerPlayer && (
        <TurnPopup position="tl" roleId="organizer" state={state}
          selectedCardIds={selFor(organizerPlayer)} selectedNeighborhood={selectedNeighborhood}
          selectedSlot={selectedSlot} dispatch={dispatch} onClearSelection={clearSelection} />
      )}
      {captainPlayer && (
        <TurnPopup position="tr" roleId="captain" state={state}
          selectedCardIds={selFor(captainPlayer)} selectedNeighborhood={selectedNeighborhood}
          selectedSlot={selectedSlot} dispatch={dispatch} onClearSelection={clearSelection} />
      )}
      {legalPlayer && (
        <TurnPopup position="bl" roleId="legal" state={state}
          selectedCardIds={selFor(legalPlayer)} selectedNeighborhood={selectedNeighborhood}
          selectedSlot={selectedSlot} dispatch={dispatch} onClearSelection={clearSelection} />
      )}
      {councilPlayer && (
        <TurnPopup position="br" roleId="council" state={state}
          selectedCardIds={selFor(councilPlayer)} selectedNeighborhood={selectedNeighborhood}
          selectedSlot={selectedSlot} dispatch={dispatch} onClearSelection={clearSelection} />
      )}

      {/* ── Surveillance incident overlay — shown after drawn cards are confirmed ── */}
      {state.pendingIncident && !state.pendingDrawnCards && (
        <IncidentOverlay
          incident={state.pendingIncident}
          player={state.players[state.currentPlayerIndex]}
          dispatch={dispatch}
        />
      )}

      {/* ── Drawn cards popup overlay ─────────────────────────── */}
      {state.pendingDrawnCards && (
        <div className="drawn-cards-overlay">
          <div className="drawn-cards-modal">
            <div className="drawn-cards-title">
              {state.players.find((p) => p.id === state.pendingDrawnCards!.playerId)?.role.emoji}{' '}
              {state.players.find((p) => p.id === state.pendingDrawnCards!.playerId)?.role.name} drew{' '}
              {state.pendingDrawnCards.cards.length} card
              {state.pendingDrawnCards.cards.length !== 1 ? 's' : ''}
            </div>
            <div className="drawn-cards-list">
              {state.pendingDrawnCards.cards.map((card) => (
                <div key={card.id} className={`drawn-card cat-border-${card.category}`}>
                  <div className="drawn-card-header">
                    <span className={`card-dot cat-${card.category}`} />
                    <span className="drawn-card-name">{card.name}</span>
                    {card.isPowerUp && <span className="drawn-card-star">⭐</span>}
                  </div>
                  <div className="drawn-card-effect">{card.effect}</div>
                  <div className="drawn-card-edu">{card.educationalContent}</div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary drawn-cards-confirm"
              onClick={() => dispatch({ type: 'ACKNOWLEDGE_DRAWN_CARDS' })}
            >
              Add to Hand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState<{ count: 2 | 3 | 4; key: number } | null>(null);

  const handleStart = (count: 2 | 3 | 4) => {
    setSession((prev) => ({ count, key: (prev?.key ?? 0) + 1 }));
  };

  const handleRestart = () => setSession(null);

  if (!session) return <GameSetup onStart={handleStart} />;

  return <GameScreen key={session.key} playerCount={session.count} onRestart={handleRestart} />;
}
