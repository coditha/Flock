import { useState, useEffect, useRef } from 'react';

interface Props {
  value: number;
  vertical?: boolean;
  blocked?: boolean;
}

export default function PrivacyMeter({ value, vertical, blocked }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [decreasing, setDecreasing] = useState(false);
  const prevValue = useRef(value);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingAnim = useRef(false);

  function triggerAnim() {
    setDecreasing(true);
    setExpanded(true);
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => {
      setDecreasing(false);
      setExpanded(false);
    }, 2200);
  }

  useEffect(() => {
    if (value < prevValue.current) {
      if (blocked) {
        pendingAnim.current = true;
      } else {
        triggerAnim();
      }
    }
    prevValue.current = value;
  }, [value]);

  useEffect(() => {
    if (!blocked && pendingAnim.current) {
      pendingAnim.current = false;
      triggerAnim();
    }
  }, [blocked]);

  const pct = (value / 30) * 100;
  const color = value <= 5 ? '#ef4444' : value <= 10 ? '#f97316' : value <= 15 ? '#eab308' : '#22c55e';
  const dot = value <= 5 ? '🔴' : value <= 10 ? '🟠' : value <= 15 ? '🟡' : '🟢';

  const critical = value <= 5;

  if (vertical) {
    return (
      <div className={`pm-inline ${expanded ? 'expanded' : ''} ${decreasing ? 'pm-decreasing' : ''}`}>
        <button
          className="pm-inline-badge"
          onClick={() => setExpanded((e) => !e)}
          title={expanded ? 'Collapse meter' : 'Expand full meter'}
        >
          <span className="pm-inline-dot">{dot}</span>
          <span className="pm-inline-num" style={{ color }}>{value}</span>
          <span className={`pm-inline-label${critical ? ' pm-critical-text' : ''}`}>Remaining</span>
          <span className="pm-inline-chevron">{expanded ? '◂' : '▸'}</span>
        </button>

        {expanded && (
          <div className="pm-hmeter">
            <span className="pm-hmeter-end lose">0</span>
            <div className="pm-hmeter-track">
              <div className="pm-hmeter-fill" style={{ width: `${pct}%`, background: color }} />
              <div className="pm-hmeter-marker" style={{ left: `${pct}%` }} title={`Current (${value})`} />
            </div>
            <span className="pm-hmeter-end safe">30</span>
            {value <= 5 && <span className="pm-hmeter-warning">⚠️</span>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`privacy-meter ${decreasing ? 'pm-decreasing' : ''}`}>
      <div className="meter-header">
        <span className={`meter-title${critical ? ' pm-critical-text' : ''}`}>Privacy &amp; Community Trust</span>
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
