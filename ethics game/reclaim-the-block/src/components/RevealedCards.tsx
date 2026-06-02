import type { SurveillanceCard } from '../types/game';

interface Props {
  cards: SurveillanceCard[];
}

const NEIGHBORHOOD_NAMES: Record<string, string> = {
  suburb: 'Suburb',
  courthouse: 'Courthouse',
  media: 'Media District',
  politics: 'Politics Row',
};

export default function RevealedCards({ cards }: Props) {
  if (cards.length === 0) return null;

  return (
    <div className="revealed-cards">
      <div className="revealed-header">👁️ Upcoming Surveillance</div>
      <div className="revealed-list">
        {cards.map((card, i) => (
          <div key={card.id} className="revealed-card">
            <span className="revealed-order">{i + 1}.</span>
            <span className="revealed-neighborhood">{NEIGHBORHOOD_NAMES[card.neighborhood]}</span>
            <span className="revealed-slot">Slot {card.slot + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
