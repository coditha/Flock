import type { Neighborhood, Player, DeviceType, SlotIndex } from '../types/game';

interface Props {
  neighborhood: Neighborhood;
  players: Player[];
  isSelected: boolean;
  onSelect: () => void;
  onSlotClick: (slotIndex: SlotIndex) => void;
  selectedSlot: SlotIndex | null;
}

const DEVICE_EMOJI: Record<DeviceType, string> = {
  ring: '📷',
  'smart-speaker': '🔊',
  'traffic-camera': '🚦',
  'flock-reader': '🚗',
};

const DEVICE_LABEL: Record<DeviceType, string> = {
  ring: 'Ring',
  'smart-speaker': 'Speaker',
  'traffic-camera': 'Traffic Cam',
  'flock-reader': 'Flock Reader',
};

const NEIGHBORHOOD_COLORS: Record<string, string> = {
  suburb: '#f59e0b',
  courthouse: '#3b82f6',
  media: '#22c55e',
  politics: '#ef4444',
};

const SLOT_LABELS = ['N1', 'N2', 'N3', 'N4'];

function slotPositionOf(position: string, neighborhoodId: string): number | null {
  const match = position.match(new RegExp(`^${neighborhoodId}-n(\\d)$`));
  return match ? parseInt(match[1]) - 1 : null;
}

export default function NeighborhoodTile({
  neighborhood,
  players,
  isSelected,
  onSelect,
  onSlotClick,
  selectedSlot,
}: Props) {
  const color = NEIGHBORHOOD_COLORS[neighborhood.id];
  const playersHere = players.filter(
    (p) => p.position === neighborhood.id || p.position.startsWith(neighborhood.id + '-n')
  );
  const filledSlots = neighborhood.slots.filter(Boolean).length;

  return (
    <div
      className={`neighborhood-tile ${isSelected ? 'selected' : ''} ${filledSlots === 4 ? 'full' : ''}`}
      style={{ borderColor: color }}
      onClick={onSelect}
    >
      <div className="neighborhood-header" style={{ background: color }}>
        <span className="neighborhood-name">{neighborhood.name}</span>
        <span className="neighborhood-density">{filledSlots}/4</span>
      </div>

      {/* Baseline devices — always 5, printed on board */}
      <div className="baseline-devices">
        {Array(5).fill(null).map((_, i) => (
          <span key={i} className="baseline-device" title="Baseline device (cannot remove)">📹</span>
        ))}
      </div>

      {/* Incoming device slots — 2×2 grid */}
      <div className="device-slots">
        {neighborhood.slots.map((device, i) => {
          const playersOnSlot = players.filter(
            (p) => slotPositionOf(p.position, neighborhood.id) === i
          );
          return (
            <div
              key={i}
              className={`device-slot ${device ? 'occupied' : 'empty'} ${selectedSlot === i ? 'slot-selected' : ''} ${playersOnSlot.length > 0 ? 'player-here' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSlotClick(i as SlotIndex);
              }}
              title={device ? `${DEVICE_LABEL[device]} — click to target` : `Empty slot ${SLOT_LABELS[i]}`}
            >
              {device ? (
                <span className="device-token">{DEVICE_EMOJI[device]}</span>
              ) : (
                <span className="slot-label">{SLOT_LABELS[i]}</span>
              )}
              {playersOnSlot.length > 0 && (
                <div className="slot-pawns">
                  {playersOnSlot.map((p) => (
                    <span key={p.id} className="slot-pawn" title={p.role.name}
                      style={{ color: p.role.colorHex }}>
                      {p.role.emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Density track */}
      <div className="density-row">
        {Array(4).fill(null).map((_, i) => (
          <div key={i} className={`density-pip ${i < filledSlots ? 'filled' : ''}`} />
        ))}
      </div>

      {/* Players here */}
      {playersHere.length > 0 && (
        <div className="players-here">
          {playersHere.map((p) => (
            <span key={p.id} className="player-pawn" title={p.role.name}>
              {p.role.emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
