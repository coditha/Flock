import type { SurveillanceCard, NeighborhoodId, SlotIndex } from '../types/game';

const neighborhoods: NeighborhoodId[] = ['suburb', 'courthouse', 'media', 'politics'];
const slots: SlotIndex[] = [0, 1, 2, 3];

// 20 cards: 5 cards per neighborhood, cycling slots
export const SURVEILLANCE_CARDS: SurveillanceCard[] = neighborhoods.flatMap((neighborhood, ni) =>
  [0, 1, 2, 3, (ni % 4)].map((slotRaw, si) => ({
    id: `surv-${neighborhood}-${si}`,
    neighborhood,
    slot: slots[slotRaw % 4],
  }))
);
