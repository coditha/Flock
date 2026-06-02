import { useState } from 'react';
import { ROLES } from '../data/roles';

interface Props {
  onStart: (playerCount: 2 | 3 | 4) => void;
}

export default function GameSetup({ onStart }: Props) {
  const [count, setCount] = useState<2 | 3 | 4>(4);

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-title">
          <h1>RECLAIM THE BLOCK</h1>
          <p className="setup-subtitle">A cooperative game about neighborhood surveillance</p>
          <p className="setup-credit">HCI 220 · UC Santa Cruz · Spring 2026</p>
        </div>

        <div className="setup-section">
          <h2>How many players?</h2>
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
          <h2>Roles in play</h2>
          <div className="role-list">
            {ROLES.slice(0, count).map((r) => (
              <div key={r.id} className="role-preview" style={{ borderColor: r.colorHex }}>
                {r.characterImage
                  ? <img src={r.characterImage} alt={r.name} className="role-character-img" />
                  : <span className="role-emoji">{r.emoji}</span>}
                <div>
                  <div className="role-name">{r.name}</div>
                  <div className="role-ability">{r.specialAbility}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>Objective</h2>
          <p className="setup-objective">
            Work together to remove all excess surveillance devices from all 4 neighborhoods before the{' '}
            <strong>Privacy &amp; Community Trust Meter</strong> hits 0.
          </p>
          <ul className="setup-rules">
            <li>🏆 <strong>Win:</strong> All 4 neighborhoods cleared (0 device tokens in incoming slots)</li>
            <li>💀 <strong>Lose:</strong> Meter drops to 0</li>
          </ul>
        </div>

        <button className="start-btn" onClick={() => onStart(count)}>
          Start Game
        </button>
      </div>
    </div>
  );
}
