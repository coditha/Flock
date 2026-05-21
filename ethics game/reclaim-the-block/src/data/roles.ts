import type { Role } from '../types/game';

export const ROLES: Role[] = [
  {
    id: 'organizer',
    name: 'Community Organizer',
    homeNeighborhood: 'suburb',
    specialAbility: 'Draw 2 extra Community Cards (instead of 1) when on the same space as at least one other player.',
    color: 'yellow',
    colorHex: '#f59e0b',
    emoji: '🟡',
  },
  {
    id: 'legal',
    name: 'Legal Advocate',
    homeNeighborhood: 'courthouse',
    specialAbility: 'Remove a device from any neighborhood by spending any 2 Community Cards (no color restriction).',
    color: 'blue',
    colorHex: '#3b82f6',
    emoji: '🔵',
  },
  {
    id: 'journalist',
    name: 'Journalist',
    homeNeighborhood: 'media',
    specialAbility: 'Once per round at the start of the Player Phase, look at the top 2 Surveillance Cards and share with the group.',
    color: 'green',
    colorHex: '#22c55e',
    emoji: '🟢',
  },
  {
    id: 'council',
    name: 'Council Member',
    homeNeighborhood: 'politics',
    specialAbility: 'Deposit only 4 Community Cards at City Hall instead of 5. One color category is covered by political maneuvering.',
    color: 'red',
    colorHex: '#ef4444',
    emoji: '🔴',
  },
];
