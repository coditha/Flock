import { useReducer, useState, useCallback } from 'react';
import { gameReducer, buildInitialState } from './store/gameReducer';
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

  return (
    <div className="game-layout">
      <header className="game-header">
        <div className="game-title">📷 RECLAIM THE BLOCK</div>
        <div className="round-info">
          Round {state.round} — {activePlayer.role.emoji} {activePlayer.role.name}
        </div>
        <button className="btn-quit" onClick={onRestart}>← New Game</button>
      </header>

      <div className="meters-row">
        <PrivacyMeter value={state.privacyMeter} />
        <DensityTracker value={state.densityTracker} />
      </div>

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

            <div className="board-roads-top"><div className="road-v" /></div>

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
                <div className="road-h" />
                <div
                  className={`city-hall ${state.players.some((p) => p.position === 'city-hall') ? 'has-players' : ''} ${canMove && activePlayer.position !== 'city-hall' ? 'moveable' : ''} ${activePlayer.position === 'city-hall' ? 'active-player-here' : ''}`}
                  onClick={() => { if (canMove && activePlayer.position !== 'city-hall') handleMove('city-hall'); }}
                >
                  <div className="city-hall-label">🏛️ CITY HALL</div>
                  <div className="city-hall-sublabel">Deposit Zone</div>
                  <div className="city-hall-players">
                    {state.players.filter((p) => p.position === 'city-hall').map((p) => (
                      <span key={p.id} title={p.role.name}>{p.role.emoji}</span>
                    ))}
                  </div>
                  {state.players.some((p) => p.position.includes('road')) && (
                    <div className="city-hall-road-players">
                      {state.players.filter((p) => p.position.includes('road')).map((p) => (
                        <span key={p.id} className="road-player" title={`${p.role.name} on road`}>
                          {p.role.emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="road-h" />
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

            <div className="board-roads-bottom"><div className="road-v" /></div>

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
      </div>

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
