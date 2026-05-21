interface Props {
  log: string[];
}

export default function GameLog({ log }: Props) {
  return (
    <div className="game-log">
      <div className="log-header">📋 Event Log</div>
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
    </div>
  );
}
