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

  const dot = value <= 5 ? '🔴' : value <= 10 ? '🟠' : value <= 15 ? '🟡' : '🟢';
  const fillColor = value <= 5 ? 'var(--red)' : value <= 15 ? 'var(--yellow)' : 'var(--green)';

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
      </div>
    );
  }

  return (
    <div className={`privacy-meter ${decreasing ? 'pm-decreasing' : ''}`}>
      <div className="meter-header">
        <span className="meter-title">Privacy &amp; Community Trust</span>
      </div>
      <div className="pm-h-segments">
        {Array.from({ length: 30 }, (_, i) => {
          const filled = i + 1 <= value;
          return (
            <div
              key={i}
              className="pm-h-seg"
              style={filled ? { background: fillColor, borderColor: fillColor } : {}}
            />
          );
        })}
      </div>
    </div>
  );
}
