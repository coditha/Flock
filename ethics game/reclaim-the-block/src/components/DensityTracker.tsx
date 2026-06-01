import { useState } from 'react';

interface Props {
  value: number;
  vertical?: boolean;
}

const DEVICE_LABELS = ['Ring', 'Ring', 'Speaker', 'Speaker', 'Traffic', 'Traffic', 'Flock', 'Flock'];
const DEVICE_EMOJIS = ['📷', '📷', '🔊', '🔊', '🚦', '🚦', '🚗', '🚗'];

export default function DensityTracker({ value, vertical }: Props) {
  const [expanded, setExpanded] = useState(false);
  const idx = Math.min(Math.max(value - 1, 0), DEVICE_EMOJIS.length - 1);

  if (vertical) {
    return (
      <div className={`density-inline ${expanded ? 'expanded' : ''}`}>
        {/* Compact badge — always shows current level; tap to toggle the in-place panel */}
        <button
          className="density-inline-badge"
          onClick={() => setExpanded((e) => !e)}
          title={expanded ? 'Collapse tracker' : 'Expand full tracker'}
        >
          <span className="density-inline-badge-emoji">{DEVICE_EMOJIS[idx]}</span>
          <span className="density-inline-badge-lv">Lv {value}</span>
          <span className="density-inline-chevron">{expanded ? '▴' : '▾'}</span>
        </button>

        {/* In-place expansion — full tracker unfolds beneath the badge */}
        {expanded && (
          <div className="density-inline-track">
            {DEVICE_LABELS.map((label, i) => (
              <div
                key={i}
                className={`density-inline-step ${i + 1 === value ? 'current' : i + 1 < value ? 'passed' : ''}`}
              >
                <span className="density-inline-emoji">{DEVICE_EMOJIS[i]}</span>
                <span className="density-inline-name">{label}</span>
                <span className="density-inline-lv">Lv {i + 1}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="density-tracker">
      <div className="density-header">
        <span className="density-title">Surveillance Density Tracker</span>
        <span className="density-value">Level {value}</span>
      </div>
      <div className="density-track">
        {DEVICE_LABELS.map((label, i) => (
          <div
            key={i}
            className={`density-step ${i + 1 === value ? 'current' : i + 1 < value ? 'passed' : ''}`}
          >
            <span className="density-emoji">{DEVICE_EMOJIS[i]}</span>
            <span className="density-label">{label}</span>
            <span className="density-num">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="density-info">
        Current device: <strong>{DEVICE_EMOJIS[value - 1]} {DEVICE_LABELS[value - 1]}</strong>
        {' '}(meter shift: {value <= 2 ? '-1' : value <= 4 ? '-1' : value <= 6 ? '-2' : '-3'} when placed)
      </div>
    </div>
  );
}
