interface Props {
  value: number;
}

const DEVICE_LABELS = ['Ring', 'Ring', 'Speaker', 'Speaker', 'Traffic', 'Traffic', 'Flock', 'Flock'];
const DEVICE_EMOJIS = ['📷', '📷', '🔊', '🔊', '🚦', '🚦', '🚗', '🚗'];

export default function DensityTracker({ value }: Props) {
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
