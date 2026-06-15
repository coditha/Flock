import { useState } from 'react';
import { ROLES } from '../data/roles';

interface Props {
  onStart: (playerCount: 2 | 3 | 4) => void;
}

const TUTORIAL_STEPS = [
  {
    title: 'The Situation',
    body: 'Your city is installing surveillance cameras, license plate readers, and smart devices across every neighborhood. Privacy is eroding and community trust is falling. You and your neighbors must work together to push back.',
  },
  {
    title: 'Your Goal',
    body: 'Remove all excess surveillance devices from all 4 neighborhoods before the Privacy & Community Trust meter hits 0. All players win or lose together.',
  },
  {
    title: 'Your Turn',
    body: 'Each turn: Roll the dice to get action points. Spend them to move around the board, remove devices, or play community cards. End your turn to draw 2 new cards.',
  },
  {
    title: 'Moving',
    body: 'Each move costs 1 action. You can move to adjacent road segments or device slots. Reach the Town Square to deposit cards and trigger a neighborhood reset.',
  },
  {
    title: 'Community Cards',
    body: 'Play 2 matching-color cards to remove a device from a neighborhood. Cards come in 5 types: Legal (blue), Organizing (yellow), Media (green), Political (red), and Neighborhood (purple).',
  },
  {
    title: 'Privacy Meter',
    body: 'The meter starts at 20/30. Every surveillance device placed drops it. If it hits 0, you lose. Removing devices and completing neighborhoods helps protect it.',
  },
  {
    title: 'Incident Cards',
    body: 'When a neighborhood fills up, an incident card is drawn. These create setbacks like dropping the trust meter or blocking a board phase. Resolve them quickly!',
  },
  {
    title: 'Winning',
    body: 'Clear all 4 neighborhoods of excess devices before the meter hits 0. Each role has a unique special ability — use them together strategically to win!',
  },
];

export default function GameSetup({ onStart }: Props) {
  const [count, setCount] = useState<2 | 3 | 4>(4);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  if (showTutorial) {
    const step = TUTORIAL_STEPS[tutorialStep];
    const isLast = tutorialStep === TUTORIAL_STEPS.length - 1;
    return (
      <div className="setup-screen">
        <div className="setup-card">
          <div className="tutorial-header">
            <button className="tutorial-back-btn" onClick={() => { setShowTutorial(false); setTutorialStep(0); }}>
              ← Back
            </button>
          </div>

          <div className="tutorial-step">
            <h2 className="tutorial-step-title">{step.title}</h2>
            <p className="tutorial-step-body">{step.body}</p>
          </div>

          <div className="tutorial-nav">
            <button
              className="count-btn tutorial-arrow-btn"
              onClick={() => setTutorialStep(s => Math.max(0, s - 1))}
              disabled={tutorialStep === 0}
            >
              ←
            </button>
            <div className="tutorial-dots">
              {TUTORIAL_STEPS.map((_, i) => (
                <button
                  key={i}
                  className={`tutorial-dot ${i === tutorialStep ? 'active' : ''}`}
                  onClick={() => setTutorialStep(i)}
                />
              ))}
            </div>
            {!isLast && (
              <button
                className="count-btn tutorial-arrow-btn"
                onClick={() => setTutorialStep(s => s + 1)}
              >
                →
              </button>
            )}
          </div>

          {isLast && (
            <button className="start-btn" onClick={() => onStart(count)}>
              Start Game
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-title">
          <h1>FLOCK</h1>
          <p className="setup-subtitle">A cooperative game about neighborhood surveillance</p>
          <p className="setup-credit">HCI 220 · UC Santa Cruz · Spring 2026</p>
        </div>

        <div className="setup-section">
          <h2>Number of Players</h2>
          <div className="player-count-buttons">
            {([2, 3, 4] as const).map((n) => (
              <button
                key={n}
                className={`count-btn ${count === n ? 'selected' : ''}`}
                onClick={() => setCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>Player Roles</h2>
          <div className="role-list">
            {ROLES.slice(0, count).map((r) => (
              <div key={r.id} className="role-preview" style={{ borderColor: r.colorHex }}>
                <div className="role-preview-header" style={{ background: r.colorHex }}>
                  {r.characterImage
                    ? <img src={r.characterImage} alt={r.name} className="role-preview-img" />
                    : <span className="role-emoji">{r.emoji}</span>
                  }
                </div>
                <div className="role-preview-body">
                  <div className="role-name" style={{ color: r.colorHex }}>{r.name}</div>
                  <div className="role-ability">{r.specialAbility}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="tutorial-btn" onClick={() => setShowTutorial(true)}>
          How to Play
        </button>

        <button className="start-btn" onClick={() => onStart(count)}>
          Start Game
        </button>
      </div>
    </div>
  );
}
