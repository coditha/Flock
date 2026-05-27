interface Props {
  value: number;
}

export default function PrivacyMeter({ value }: Props) {
  const pct = (value / 30) * 100;
  const color = value <= 5 ? '#ef4444' : value <= 10 ? '#f97316' : value <= 15 ? '#eab308' : '#22c55e';

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
