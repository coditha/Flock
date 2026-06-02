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

const NHCOLOR: Record<string, string> = { suburb: 'yellow', courthouse: 'blue', media: 'green', politics: 'red' };

// Isometric pixel-art die — three visible faces with dots on each
// Vertices: FTL(11,30) FTR(53,30) FBL(11,62) FBR(53,62) BTL(21,16) BTR(63,16) BBR(63,48)

// Front face (x 11-53, y 30-62). Symmetric 3×3 grid of 7×7 pips (top-left coords).
// cols L=17 C=28.5 R=40   rows T=35 M=42.5 B=50
const FACE_DOTS: Record<number, [number, number][]> = {
  1: [[28.5, 42.5]],
  2: [[40, 35], [17, 50]],
  3: [[40, 35], [28.5, 42.5], [17, 50]],
  4: [[17, 35], [40, 35], [17, 50], [40, 50]],
  5: [[17, 35], [40, 35], [28.5, 42.5], [17, 50], [40, 50]],
  6: [[17, 32], [40, 32], [17, 43], [40, 43], [17, 54], [40, 54]],
};

// Top face: 6×3 pips on a 3×3 grid that follows the cube's shear (rows shift right
// toward the back). Top-left coords.
const TOP_DOTS: Record<number, [number, number][]> = {
  1: [[34, 21.5]],
  2: [[47.6, 19], [20.4, 24]],
  3: [[47.6, 19], [34, 21.5], [20.4, 24]],
  4: [[24, 19], [47.6, 19], [20.4, 24], [44, 24]],
  5: [[24, 19], [47.6, 19], [34, 21.5], [20.4, 24], [44, 24]],
  6: [[20.4, 24], [22.2, 21.5], [24, 19], [44, 24], [45.8, 21.5], [47.6, 19]],
};

// Right face: 3×4 pips on a 3×3 grid following the shear (back column sits higher).
// Top-left coords within the narrow x 53-63 shadow face.
const RIGHT_DOTS: Record<number, [number, number][]> = {
  1: [[56.5, 37]],
  2: [[58.7, 25], [54.3, 49]],
  3: [[58.7, 25], [56.5, 37], [54.3, 49]],
  4: [[54.3, 31], [58.7, 25], [54.3, 49], [58.7, 43]],
  5: [[54.3, 31], [58.7, 25], [56.5, 37], [54.3, 49], [58.7, 43]],
  6: [[54.3, 31], [54.3, 40], [54.3, 49], [58.7, 25], [58.7, 34], [58.7, 43]],
};

// Which faces appear on top and right when front shows each value.
// Opposite faces (sum to 7) can never be visible together — all combos avoid that.
const SIDE_FACES: Record<number, { top: number; right: number }> = {
  1: { top: 2, right: 3 },
  2: { top: 3, right: 6 },
  3: { top: 2, right: 6 },
  4: { top: 5, right: 1 },
  5: { top: 4, right: 1 },
  6: { top: 3, right: 5 },
};

function PixelDie({ face }: { face: number }) {
  const frontDots = FACE_DOTS[face] ?? FACE_DOTS[1];
  const { top: topFace, right: rightFace } = SIDE_FACES[face] ?? { top: 2, right: 3 };
  const topDots = TOP_DOTS[topFace] ?? [];
  const rightDots = RIGHT_DOTS[rightFace] ?? [];

  return (
    <svg className="px-die-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {/* Ground shadow */}
      <ellipse cx="42" cy="70" rx="25" ry="5" fill="#3a2410" opacity="0.22" />

      {/* Right face fill — darkest (away from light source) */}
      <polygon points="53,30 63,16 63,48 53,62" fill="#b09050" />
      {/* Right face dots — tall-narrow to suggest vertical face in shadow */}
      {rightDots.map(([x, y], i) => (
        <rect key={`r${i}`} x={x} y={y} width="3" height="4" fill="#2a1808" rx="0.5" opacity="0.75" />
      ))}

      {/* Top face fill — lightest (catches most light) */}
      <polygon points="21,16 63,16 53,30 11,30" fill="#f8ecc0" />
      {/* Top face dots — wide-flat to suggest horizontal surface */}
      {topDots.map(([x, y], i) => (
        <rect key={`t${i}`} x={x} y={y} width="6" height="3" fill="#3a2410" rx="0.5" opacity="0.75" />
      ))}

      {/* Front face fill — medium brightness */}
      <polygon points="11,30 53,30 53,62 11,62" fill="#e8d4a0" />

      {/* Inner highlight — top and left edges of front face */}
      <line x1="12" y1="30" x2="52" y2="30" stroke="#fffae0" strokeWidth="1.5" opacity="0.65" />
      <line x1="11" y1="31" x2="11" y2="61" stroke="#fffae0" strokeWidth="1.5" opacity="0.5" />
      {/* Inner shadow — bottom and right edges of front face */}
      <line x1="12" y1="62" x2="52" y2="62" stroke="#9a7840" strokeWidth="1" opacity="0.4" />
      <line x1="53" y1="31" x2="53" y2="61" stroke="#9a7840" strokeWidth="1" opacity="0.4" />

      {/* Top face left-slope highlight */}
      <line x1="21" y1="16" x2="11" y2="30" stroke="#fff8e0" strokeWidth="1" opacity="0.6" />

      {/* Pixel-art outlines for all three faces */}
      <polygon points="21,16 63,16 53,30 11,30" fill="none" stroke="#3a2410" strokeWidth="1.5" />
      <polygon points="11,30 53,30 53,62 11,62" fill="none" stroke="#3a2410" strokeWidth="1.5" />
      <polygon points="53,30 63,16 63,48 53,62" fill="none" stroke="#3a2410" strokeWidth="1.5" />

      {/* Front face dots — slightly smaller for 6 to give breathing room */}
      {frontDots.map(([x, y], i) => {
        const s = face === 6 ? 6 : 7;
        return <rect key={i} x={x} y={y} width={s} height={s} fill="#3a2410" rx="1" />;
      })}
    </svg>
  );
}

// Sparkle directions: 8 points of the compass, ~44px radius
const SPARKLE_DIRS = [
  { tx: 0, ty: -44 }, { tx: 31, ty: -31 }, { tx: 44, ty: 0 }, { tx: 31, ty: 31 },
  { tx: 0, ty: 44 },  { tx: -31, ty: 31 }, { tx: -44, ty: 0 }, { tx: -31, ty: -31 },
];

export default function ActionPanel({
  state, selectedCardIds, selectedNeighborhood, selectedSlot, dispatch, onClearSelection,
}: Props) {
  const { phase, actionsRemaining, currentPlayerIndex, players, pendingIncident, pendingDiscard } = state;
  const player = players[currentPlayerIndex];
  const actions = actionsRemaining;

  // ── Share Knowledge picker state ─────────────────────────────────────────
  const [shareStep, setShareStep] = useState<'idle' | 'pick-player' | 'pick-card'>('idle');
  const [shareTargetId, setShareTargetId] = useState<number | null>(null);

  // ── Dice animation state ─────────────────────────────────────────────────
  const [rolling, setRolling] = useState(false);
  const [landed, setLanded] = useState(false);
  const [rollingFace, setRollingFace] = useState(6);
  const rollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleDiceTap() {
    if (rolling || landed) return;
    const finalRoll = Math.floor(Math.random() * 6) + 1;
    setRolling(true);
    setLanded(false);
    const totalSteps = 14;
    // Ease-out: interval starts at 50ms and grows to ~220ms over totalSteps
    function scheduleStep(step: number) {
      const t = step / totalSteps; // 0 → 1
      const delay = 40 + t * t * t * 320; // cubic ease-out: 40ms → 360ms
      rollTimer.current = setTimeout(() => {
        if (step >= totalSteps) {
          setRollingFace(finalRoll);
          setRolling(false);
          setLanded(true);
          setTimeout(() => dispatch({ type: 'ROLL_DIE', precomputedRoll: finalRoll }), 450);
        } else {
          setRollingFace(Math.floor(Math.random() * 6) + 1);
          scheduleStep(step + 1);
        }
      }, delay);
    }
    scheduleStep(0);
  }

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

  const colocatedPlayers = players.filter((p) => p.id !== player.id && p.position === player.position);
  const canShare = canAct && colocatedPlayers.length > 0 && player.hand.length > 0;

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
    {
      id: 'share',
      icon: '🤝',
      label: 'Share Knowledge',
      tooltip: [
        'Cost: 1 action.',
        'Give 1 Community Card to a teammate on your tile.',
        'Both players must occupy the exact same space.',
      ].join('\n'),
      available: canShare,
      onTap: () => setShareStep('pick-player'),
    },
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

      {/* ── Action tracker (panel header removed — player identified by color/corner) ── */}
      {phase === 'player-turn' && !state.pendingDiceRoll && !pendingIncident && !pendingDiscard && (() => {
        const total = Math.max(state.lastDiceRoll ?? actions, actions);
        return (
          <div className="ap-action-tracker">
            <div className="ap-action-count">
              <span className="ap-action-num">{actions}</span>
              <span className="ap-action-sep"> / {total} Actions Remaining</span>
            </div>
          </div>
        );
      })()}

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
          <div className="ap-incident-title">✋ Hand Limit Exceeded</div>
          <div className="ap-incident-effect">
            Choose {pendingDiscard.count} card{pendingDiscard.count > 1 ? 's' : ''} to discard
            (max 7 in hand). Tap cards in your hand to select.
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
        <div className="ap-dice-interactive">
          <div className="ap-dice-prompt">
            {rolling ? 'Rolling…' : landed ? `Rolled ${rollingFace}!` : 'Tap to roll!'}
          </div>
          <div
            className={`ap-die-wrap${rolling ? ' jitter' : landed ? ' land' : ''}`}
            onClick={handleDiceTap}
            role="button"
            aria-label="Roll dice"
          >
            <PixelDie face={rollingFace} />
            {landed && SPARKLE_DIRS.map((dir, i) => (
              <span
                key={i}
                className="px-sparkle"
                style={{ '--tx': `${dir.tx}px`, '--ty': `${dir.ty}px` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Action grid / Share Knowledge picker ───────────────── */}
      {phase === 'player-turn' && !state.pendingDiceRoll && !pendingIncident && !pendingDiscard && (
        <div className="ap-body">

          {shareStep !== 'idle' ? (
            /* ── Share Knowledge multi-step picker ── */
            <div className="ap-share-picker">
              {shareStep === 'pick-player' ? (
                <>
                  <div className="ap-share-title">🤝 Who to share with?</div>
                  {colocatedPlayers.map((p) => (
                    <button
                      key={p.id}
                      className="ap-share-option"
                      style={{ borderColor: p.role.colorHex }}
                      onClick={() => { setShareTargetId(p.id); setShareStep('pick-card'); }}
                    >
                      {p.role.emoji} {p.role.name}
                    </button>
                  ))}
                  <button className="ap-share-cancel" onClick={() => setShareStep('idle')}>✕ Cancel</button>
                </>
              ) : (
                <>
                  <div className="ap-share-title">🤝 Which card to give?</div>
                  {player.hand.map((card) => (
                    <button
                      key={card.id}
                      className="ap-share-option"
                      onClick={() => {
                        dispatch({ type: 'SHARE_KNOWLEDGE', fromPlayerId: player.id, toPlayerId: shareTargetId!, cardId: card.id });
                        setShareStep('idle');
                        setShareTargetId(null);
                      }}
                    >
                      <span className={`card-dot cat-${card.category}`} /> {card.name}
                    </button>
                  ))}
                  <button className="ap-share-cancel" onClick={() => { setShareStep('pick-player'); setShareTargetId(null); }}>← Back</button>
                </>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
