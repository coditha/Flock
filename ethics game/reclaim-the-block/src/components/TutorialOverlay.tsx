import { useState } from 'react';

interface Props {
  onClose: () => void;
}

const STEPS = [
  {
    title: 'The Situation',
    body: 'Your city is installing surveillance cameras, license plate readers, and smart devices across every neighborhood. Privacy is eroding and community trust is falling. Work together to push back.',
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

export default function TutorialOverlay({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="tutorial-overlay" onClick={onClose}>
      <div className="tutorial-overlay-panel" onClick={e => e.stopPropagation()}>
        <div className="tutorial-overlay-header">
          <span className="tutorial-overlay-title">How to Play</span>
          <button className="tutorial-overlay-close" onClick={onClose}>✕</button>
        </div>

        <div className="tutorial-overlay-step">
          <div className="tutorial-overlay-step-title">{current.title}</div>
          <p className="tutorial-overlay-step-body">{current.body}</p>
        </div>

        <div className="tutorial-overlay-nav">
          <button
            className="tutorial-overlay-nav-btn"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            ←
          </button>
          <div className="tutorial-dots">
            {STEPS.map((_, i) => (
              <button
                key={i}
                className={`tutorial-dot ${i === step ? 'active' : ''}`}
                onClick={() => setStep(i)}
              />
            ))}
          </div>
          {isLast ? (
            <button className="tutorial-overlay-nav-btn tutorial-overlay-done" onClick={onClose}>
              Done
            </button>
          ) : (
            <button className="tutorial-overlay-nav-btn" onClick={() => setStep(s => s + 1)}>
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
