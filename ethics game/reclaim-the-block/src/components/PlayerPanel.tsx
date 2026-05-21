import type { Player, CommunityCard } from '../types/game';
import CardDisplay from './CardDisplay';

interface Props {
  player: Player;
  isActive: boolean;
  selectedCardIds: string[];
  onCardClick: (card: CommunityCard) => void;
}

const POSITION_LABELS: Record<string, string> = {
  suburb: 'Suburb',
  courthouse: 'Courthouse',
  media: 'Media District',
  politics: 'Politics Row',
  'city-hall': 'City Hall',
  'suburb-road-1': 'Road (Suburb→City)',
  'suburb-road-2': 'Road (City→Suburb)',
  'courthouse-road-1': 'Road (Courthouse→City)',
  'courthouse-road-2': 'Road (City→Courthouse)',
  'media-road-1': 'Road (Media→City)',
  'media-road-2': 'Road (City→Media)',
  'politics-road-1': 'Road (Politics→City)',
  'politics-road-2': 'Road (City→Politics)',
};

export default function PlayerPanel({ player, isActive, selectedCardIds, onCardClick }: Props) {
  return (
    <div
      className={`player-panel ${isActive ? 'active-player' : ''}`}
      style={{ borderColor: player.role.colorHex }}
    >
      <div className="player-header" style={{ background: player.role.colorHex }}>
        <span className="player-role-emoji">{player.role.emoji}</span>
        <div className="player-info">
          <span className="player-role-name">{player.role.name}</span>
          <span className="player-position">📍 {POSITION_LABELS[player.position] ?? player.position}</span>
        </div>
        {isActive && <span className="active-badge">ACTIVE</span>}
      </div>

      <div className="player-ability">
        <strong>Ability:</strong> {player.role.specialAbility}
      </div>

      <div className="player-hand-header">
        Hand ({player.hand.length}/7)
      </div>

      <div className="player-hand">
        {player.hand.length === 0 ? (
          <div className="empty-hand">No cards</div>
        ) : (
          player.hand.map((card) => (
            <CardDisplay
              key={card.id}
              card={card}
              isSelected={selectedCardIds.includes(card.id)}
              onClick={() => onCardClick(card)}
            />
          ))
        )}
      </div>
    </div>
  );
}
