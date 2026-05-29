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
  const filledSlots = neighborhood.slots.filter(Boolean).length;
  const isCurrentNeighborhood =
    activePlayerPosition === neighborhood.id ||
    activePlayerPosition.startsWith(neighborhood.id + '-n');
  const roadTile = `${neighborhood.id}-road-1` as Position;
  const isOnRoadToThis =
    activePlayerPosition === roadTile ||
    activePlayerPosition === (`${neighborhood.id}-road-2` as Position);
  const reachableFromHere = canMove ? getReachablePositions(activePlayerPosition as Position) : [];
  // Clicking the tile moves to this neighborhood's road-1 waypoint (first step)
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

      {/* 2×2 device slots with roads on all 4 sides forming a square ring */}
      <div className="device-slots-square">
        {/* Render helper: a device slot */}
        {([0, 1, 2, 3] as const).map((i) => {
          const slotPos = `${neighborhood.id}-n${i + 1}` as Position;
          const device = neighborhood.slots[i];
          const playersOnSlot = players.filter(
            (p) => slotPositionOf(p.position, neighborhood.id) === i
          );
          const slotMoveable = canMove && reachableFromHere.includes(slotPos);
          const isActivePlayerHere = activePlayerPosition === slotPos;
          const slotRemoveable = canMove && isCurrentNeighborhood && device !== null && !isActivePlayerHere;
          return (
            <div
              key={`slot-${i}`}
              className={`device-slot sq-slot-${i + 1} ${device ? 'occupied' : 'empty'} ${selectedSlot === i ? 'slot-selected' : ''} ${playersOnSlot.length > 0 ? 'player-here' : ''} ${slotMoveable ? 'slot-moveable' : ''} ${isActivePlayerHere ? 'active-player-here' : ''} ${slotRemoveable ? 'slot-removeable' : ''}`}
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
        {/* Road tiles: nr1=top, nr2=right, nr3=bottom, nr4=left */}
        {(['nr1', 'nr2', 'nr3', 'nr4'] as const).map((nrKey) => {
          const roadPos = `${neighborhood.id}-${nrKey}` as Position;
          const roadMoveable = canMove && reachableFromHere.includes(roadPos);
          const isActivePlayerOnRoad = activePlayerPosition === roadPos;
          const playersOnRoad = players.filter((p) => p.position === roadPos);
          return (
            <div
              key={nrKey}
              className={`internal-road sq-road-${nrKey} ${roadMoveable ? 'moveable' : ''} ${isActivePlayerOnRoad ? 'active-player-here' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (roadMoveable) onMove(roadPos);
              }}
              title={`Road ${nrKey}`}
            >
              {playersOnRoad.map((p) => (
                <span key={p.id} className="slot-pawn" title={p.role.name}
                  style={{ color: p.role.colorHex }}>
                  {p.role.emoji}
                </span>
              ))}
            </div>
          );
        })}
        {/* Empty center */}
        <div className="sq-center" />
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
