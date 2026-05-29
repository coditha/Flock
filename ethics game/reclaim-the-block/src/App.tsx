import { useReducer, useState, useCallback } from 'react';
import { gameReducer, buildInitialState, getReachablePositions } from './store/gameReducer';
import type { NeighborhoodId, SlotIndex, CommunityCard } from './types/game';
import GameSetup from './components/GameSetup';
import GameOver from './components/GameOver';
import PrivacyMeter from './components/PrivacyMeter';
import DensityTracker from './components/DensityTracker';
import NeighborhoodTile from './components/NeighborhoodTile';
import PlayerPanel from './components/PlayerPanel';
import ActionPanel from './components/ActionPanel';
import GameLog from './components/GameLog';
import RevealedCards from './components/RevealedCards';

// ── Game screen — rendered only when playerCount is set ────────────────────

interface GameScreenProps {
  playerCount: 2 | 3 | 4;
  onRestart: () => void;
}

function GameScreen({ playerCount, onRestart }: GameScreenProps) {
  const [state, dispatch] = useReducer(gameReducer, playerCount, buildInitialState);

  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodId | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotIndex | null>(null);

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

  const handleMove = useCallback((position: import('./types/game').Position) => {
    dispatch({ type: 'MOVE', to: position });
  }, [dispatch]);

  const canMove = state.phase === 'player-turn'
    && !state.pendingDiceRoll
    && !(state.pendingIncident)
    && state.actionsRemaining > 0;


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

  return (
    <div className="game-layout">
      <header className="game-header">
        <div className="game-title">📷 RECLAIM THE BLOCK</div>
        <div className="round-info">
          Round {state.round} — {activePlayer.role.emoji} {activePlayer.role.name}
        </div>
        <button className="btn-quit" onClick={onRestart}>← New Game</button>
      </header>

      <div className="game-body">
        <div className="side-tracker">
          <PrivacyMeter value={state.privacyMeter} vertical />
        </div>

        <div className="game-center">
          <RevealedCards cards={state.revealedSurveillanceCards} />

          <div className="main-area">
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
                  className={`road-waypoint${activePlayer.position === 'suburb-road-2' ? ' active-player-here' : ''}${reachable('suburb-road-2') ? ' moveable' : ''}`}
                  onClick={() => { if (reachable('suburb-road-2')) handleMove('suburb-road-2'); }}
                >
                  {state.players.filter((p) => p.position === 'suburb-road-2').map((p) => (
                    <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                  ))}
                </div>
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
                    className={`road-waypoint${activePlayer.position === 'courthouse-road-2' ? ' active-player-here' : ''}${reachable('courthouse-road-2') ? ' moveable' : ''}`}
                    onClick={() => { if (reachable('courthouse-road-2')) handleMove('courthouse-road-2'); }}
                  >
                    {state.players.filter((p) => p.position === 'courthouse-road-2').map((p) => (
                      <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                    ))}
                  </div>
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
                  <div
                    className={`road-waypoint${activePlayer.position === 'media-road-2' ? ' active-player-here' : ''}${reachable('media-road-2') ? ' moveable' : ''}`}
                    onClick={() => { if (reachable('media-road-2')) handleMove('media-road-2'); }}
                  >
                    {state.players.filter((p) => p.position === 'media-road-2').map((p) => (
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
                <div
                  className={`road-waypoint${activePlayer.position === 'politics-road-2' ? ' active-player-here' : ''}${reachable('politics-road-2') ? ' moveable' : ''}`}
                  onClick={() => { if (reachable('politics-road-2')) handleMove('politics-road-2'); }}
                >
                  {state.players.filter((p) => p.position === 'politics-road-2').map((p) => (
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

        <div className="right-panel">
          <ActionPanel
            state={state}
            selectedCardIds={selectedCardIds}
            selectedNeighborhood={selectedNeighborhood}
            selectedSlot={selectedSlot}
            dispatch={dispatch}
            onClearSelection={clearSelection}
          />
          <GameLog log={state.gameLog} />
        </div>
        </div>{/* end main-area */}
        </div>{/* end game-center */}

        <div className="side-tracker">
          <DensityTracker value={state.densityTracker} vertical />
        </div>
      </div>{/* end game-body */}

      <div className="players-row">
        {state.players.map((player) => (
          <PlayerPanel
            key={player.id}
            player={player}
            isActive={player.id === activePlayer.id}
            selectedCardIds={player.id === activePlayer.id ? selectedCardIds : []}
            onCardClick={player.id === activePlayer.id ? handleCardClick : () => {}}
          />
        ))}
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState<{ count: 2 | 3 | 4; key: number } | null>(null);

  const handleStart = (count: 2 | 3 | 4) => {
    setSession((prev) => ({ count, key: (prev?.key ?? 0) + 1 }));
  };

  const handleRestart = () => setSession(null);

  if (!session) return <GameSetup onStart={handleStart} />;

  return <GameScreen key={session.key} playerCount={session.count} onRestart={handleRestart} />;
}
