import type { CommunityCard } from '../types/game';
import { useState } from 'react';

interface Props {
  card: CommunityCard;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  blue: '#3b82f6',
  yellow: '#f59e0b',
  green: '#22c55e',
  red: '#ef4444',
  purple: '#a855f7',
};

const CATEGORY_LABELS: Record<string, string> = {
  blue: 'Legal',
  yellow: 'Organizing',
  green: 'Media',
  red: 'Political',
  purple: 'Neighborhood',
};

export default function CardDisplay({ card, isSelected, onClick, disabled }: Props) {
  const [flipped, setFlipped] = useState(false);
  const color = CATEGORY_COLORS[card.category];

  return (
    <div
      className={`card ${isSelected ? 'card-selected' : ''} ${disabled ? 'card-disabled' : ''} ${card.isPowerUp ? 'card-powerup' : ''}`}
      style={{ borderColor: color }}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="card-top" style={{ background: color }}>
        <span className="card-category">{CATEGORY_LABELS[card.category]}</span>
        {card.isPowerUp && <span className="powerup-star">⭐</span>}
      </div>
      <div className="card-name">{card.name}</div>
      <div className="card-effect">{card.effect}</div>
      <button
        className="card-flip-btn"
        onClick={(e) => {
          e.stopPropagation();
          setFlipped((f) => !f);
        }}
        title="Toggle educational content"
      >
        {flipped ? '▲' : '▼'}
      </button>
      {flipped && (
        <div className="card-edu">
          {card.educationalContent}
        </div>
      )}
    </div>
  );
}
