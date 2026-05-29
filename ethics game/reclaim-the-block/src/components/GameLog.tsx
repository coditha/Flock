import { useState } from 'react';

interface Props {
  log: string[];
}

export default function GameLog({ log }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="game-log">
      <div className="log-header log-header-toggle" onClick={() => setOpen((o) => !o)}>
        <span>📋 Event Log</span>
        <span className="log-toggle-icon">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
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
      )}
    </div>
  );
}
