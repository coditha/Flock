interface Props {
  log: string[];
}

// Renders just the scrollable list of entries; visibility is controlled by the parent
// (the 📜 Log button in the top bar).
export default function GameLog({ log }: Props) {
  return (
    <div className="log-entries">
      {log.map((entry, i) => (
        <div
          key={i}
          className={`log-entry ${
            entry.includes('⚠️') || entry.includes('INCIDENT')
              ? 'log-incident'
              : entry.includes('Meter')
              ? 'log-meter'
              : entry.includes('Win') || entry.includes('cleared')
              ? 'log-good'
              : ''
          }`}
        >
          {entry}
        </div>
      ))}
    </div>
  );
}
