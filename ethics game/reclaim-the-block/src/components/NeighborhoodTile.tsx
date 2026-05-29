import type { Neighborhood, Player, DeviceType, SlotIndex, Position } from '../types/game';
import { getReachablePositions } from '../store/gameReducer';

interface Props {
  neighborhood: Neighborhood;
  players: Player[];
  isSelected: boolean;
  onSelect: () => void;
  onSlotClick: (slotIndex: SlotIndex) => void;
  selectedSlot: SlotIndex | null;
  canMove: boolean;
  activePlayerPosition: string;
  onMove: (position: Position) => void;
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
  canMove,
  activePlayerPosition,
  onMove,
}: Props) {
  const color = NEIGHBORHOOD_COLORS[neighborhood.id];
  const playersHere = players.filter(
    (p) => p.position === neighborhood.id || p.position.startsWith(neighborhood.id + '-n')
  );
  const filledSlots = neighborhood.slots.filter(Boolean).length;
  const isCurrentNeighborhood =
    activePlayerPosition === neighborhood.id ||
    activePlayerPosition.startsWith(neighborhood.id + '-n');
  const roadTile = `${neighborhood.id}-road-1` as Position;
  const isOnRoadToThis = activePlayerPosition === roadTile;
  const reachableFromHere = canMove ? getReachablePositions(activePlayerPosition as Position) : [];
  // Clicking the tile moves to this neighborhood's road waypoint (first step)
  const tileMoveable = canMove && !isCurrentNeighborhood && !isOnRoadToThis && reachableFromHere.includes(roadTile);

  return (
    <div
      className={`neighborhood-tile ${isSelected ? 'selected' : ''} ${filledSlots === 4 ? 'full' : ''} ${tileMoveable ? 'moveable' : ''}`}
      style={{ borderColor: color }}
      onClick={() => {
        if (tileMoveable) onMove(roadTile);
        onSelect();
      }}
    >
      <div className="neighborhood-header" style={{ background: color }}>
        <span className="neighborhood-name">{neighborhood.name}</span>
        <span className="neighborhood-density">{filledSlots}/4</span>
      </div>

      {/* Baseline devices — always 4, printed on board */}
      <div className="baseline-devices">
        {Array(4).fill(null).map((_, i) => (
          <span key={i} className="baseline-device" title="Baseline device (cannot remove)">📹</span>
        ))}
      </div>

      {/* Incoming device slots — 2×2 grid */}
      <div className="device-slots">
        {neighborhood.slots.map((device, i) => {
          const playersOnSlot = players.filter(
            (p) => slotPositionOf(p.position, neighborhood.id) === i
          );
          const slotPos = `${neighborhood.id}-n${i + 1}` as Position;
          // Slots are reachable from within the neighborhood or from the road waypoint
          const slotMoveable = canMove && activePlayerPosition !== slotPos && (isCurrentNeighborhood || isOnRoadToThis);
          // Highlight logic: exact slot match, only when actions are available
          const isActivePlayerHere = canMove && activePlayerPosition === slotPos;
          // Slot has a device and player is in the neighborhood — highlight as removeable target
          const slotRemoveable = canMove && isCurrentNeighborhood && device !== null && !isActivePlayerHere;
          return (
            <div
              key={i}
              className={`device-slot ${device ? 'occupied' : 'empty'} ${selectedSlot === i ? 'slot-selected' : ''} ${playersOnSlot.length > 0 ? 'player-here' : ''} ${slotMoveable ? 'slot-moveable' : ''} ${isActivePlayerHere ? 'active-player-here' : ''} ${slotRemoveable ? 'slot-removeable' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (slotMoveable) onMove(slotPos);
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

      {/* Players here — removed: players now always start at N1 and show on slots */}
    </div>
  );
}
