import { useState } from 'react';

interface Props {
  value: number;
  vertical?: boolean;
}

export default function PrivacyMeter({ value, vertical }: Props) {
  const [expanded, setExpanded] = useState(false);
  const pct = (value / 30) * 100;
  const color = value <= 5 ? '#ef4444' : value <= 10 ? '#f97316' : value <= 15 ? '#eab308' : '#22c55e';
  // Severity dot: green safe → yellow caution → orange high-risk → red critical (loss at 0)
  const dot = value <= 5 ? '🔴' : value <= 10 ? '🟠' : value <= 15 ? '🟡' : '🟢';

  if (vertical) {
    return (
      <div className={`pm-inline ${expanded ? 'expanded' : ''}`}>
        {/* Compact badge — spaces remaining + severity color; tap to toggle in place */}
        <button
          className="pm-inline-badge"
          onClick={() => setExpanded((e) => !e)}
          title={expanded ? 'Collapse meter' : 'Expand full meter'}
        >
          <span className="pm-inline-dot">{dot}</span>
          <span className="pm-inline-num" style={{ color }}>{value}</span>
          <span className="pm-inline-label">Remaining</span>
          <span className="pm-inline-chevron">{expanded ? '▴' : '▾'}</span>
        </button>

        {/* In-place expansion — the full meter, unfolded beneath the badge */}
        {expanded && (
          <div className="privacy-meter-v">
            <div className="meter-v-value" style={{ color }}>{value}</div>
            <div className="meter-v-safe">30</div>
            <div className="meter-v-track">
              <div className="meter-v-fill" style={{ height: `${pct}%`, background: color }} />
              <div className="meter-v-marker" style={{ bottom: `${pct}%` }} />
            </div>
            <div className="meter-v-lose">0</div>
            {value <= 5 && <div className="meter-v-warning">⚠️</div>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="privacy-meter">
      <div className="meter-header">
        <span className="meter-title">Privacy &amp; Community Trust</span>
        <span className="meter-value" style={{ color }}>
          {value} / 30
        </span>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${pct}%`, background: color }} />
        <div className="meter-marker start" style={{ left: `${pct}%` }} title={`Current (${value})`} />
      </div>
      <div className="meter-labels">
        <span className="meter-label-lose">0 LOSE</span>
        <span className="meter-label-safe">30 SAFE</span>
      </div>
      {value <= 5 && <div className="meter-warning">⚠️ CRITICAL — one bad round ends the game!</div>}
    </div>
  );
}
