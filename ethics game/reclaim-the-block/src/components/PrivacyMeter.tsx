import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  vertical?: boolean;
  blocked?: boolean;
}

export default function PrivacyMeter({ value, vertical, blocked }: Props) {
  const [decreasing, setDecreasing] = useState(false);
  const prevValue = useRef(value);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingAnim = useRef(false);

  function triggerAnim() {
    setDecreasing(true);
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => {
      setDecreasing(false);
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
      <div className={`pm-seg-meter ${decreasing ? 'pm-decreasing' : ''}`}>
        <div className={`pm-seg-title${critical && !blocked ? ' pm-critical-active' : ''}`}>
          {dot} Privacy &amp; Trust
        </div>
        <div className="pm-segments">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => {
            const filled = value >= n;
            const segColor = n <= 5 ? '#ef4444' : n <= 10 ? '#f97316' : n <= 15 ? '#eab308' : '#22c55e';
            return (
              <div key={n} className={`pm-seg${filled ? ' pm-seg-filled' : ''}`}
                style={filled ? { background: segColor, borderColor: segColor } : {}}>
              </div>
            );
          })}
        </div>
        <div className="pm-seg-labels">
          <span style={{ color: 'var(--red)' }}>0</span>
          <span style={{ color: 'var(--text-muted)' }}>15</span>
          <span style={{ color: 'var(--green)' }}>30</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`privacy-meter ${decreasing ? 'pm-decreasing' : ''}`}>
      <div className={`meter-header${critical && !blocked ? ' pm-critical-active' : ''}`}>
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
    </div>
  );
}
