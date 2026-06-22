import type { IncidentCard } from '../types/game';
import { INCIDENT_CARDS } from './cards';

interface RoundConfig {
  incidentId: string;
  boardPhaseEvent: string;
}

export const ROUND_CONFIG: Record<number, RoundConfig> = {
  1: {
    incidentId: 'incident-01',
    boardPhaseEvent: 'Package thefts lead more residents to install home cameras.',
  },
  2: {
    incidentId: 'incident-04',
    boardPhaseEvent: 'Shops and streets install more security cameras to prevent crimes.',
  },
  3: {
    incidentId: 'incident-02',
    boardPhaseEvent: 'Police begin requesting access to private and store camera footage.',
  },
  4: {
    incidentId: 'incident-07',
    boardPhaseEvent: 'Courts allow police to access more surveillance footage without strong restrictions.',
  },
  5: {
    incidentId: 'incident-03',
    boardPhaseEvent: 'Footage from homes, streets, and stores are now connected so information can be shared easily.',
  },
  6: {
    incidentId: 'incident-06',
    boardPhaseEvent: 'Cameras begin using AI to identify people and track movement.',
  },
  7: {
    incidentId: 'incident-09',
    boardPhaseEvent: 'The city starts using data to predict where more monitoring is needed.',
  },
};

export function getIncidentForRound(round: number): IncidentCard | undefined {
  const config = ROUND_CONFIG[round];
  if (!config) return undefined;
  return INCIDENT_CARDS.find((c) => c.id === config.incidentId) as IncidentCard | undefined;
}

export function getBoardPhaseEvent(round: number): string {
  return ROUND_CONFIG[round]?.boardPhaseEvent ?? 'The city is placing the next surveillance device.';
}
