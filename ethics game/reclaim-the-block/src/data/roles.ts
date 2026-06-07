import type { Role } from '../types/game';

export const ROLES: Role[] = [
  {
    id: 'organizer',
    name: 'Parent',
    homeNeighborhood: 'suburb',
    specialAbility: 'Draw 1 extra Community Card, but only when on the same tile as another player.',
    color: 'yellow',
    colorHex: '#f59e0b',
    emoji: '🟡',
  },
  {
    id: 'legal',
    name: 'Lawyer',
    homeNeighborhood: 'courthouse',
    specialAbility: 'Spend 2 Community Cards of different colors to remove a single surveillance device from any neighborhood.',
    color: 'blue',
    colorHex: '#3b82f6',
    emoji: '🔵',
  },
  {
    id: 'captain',
    name: 'Activist',
    homeNeighborhood: 'media',
    specialAbility: 'Discard 2 Community Cards to reverse overflow — lower the Surveillance Density Tracker by 1.',
    color: 'green',
    colorHex: '#22c55e',
    emoji: '🟢',
  },
  {
    id: 'council',
    name: 'City Council Member',
    homeNeighborhood: 'politics',
    specialAbility: 'Deposit only 4 Community Cards at the Town Square instead of 5 when performing a neighborhood reset.',
    color: 'red',
    colorHex: '#ef4444',
    emoji: '🔴',
  },
];
