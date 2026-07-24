import type { EarlyActivity } from './types';
import { getAgeBand } from './types';

/**
 * Free catalog for ages 10+ / adults.
 * Geography is the main ready module; deeper packs expand in later phases.
 */
export const ADULT_ACTIVITIES: EarlyActivity[] = [
  {
    id: 'adult-geography',
    ageBand: '10-plus',
    kind: 'geography',
    titleKey: 'adult.geography.title',
    descriptionKey: 'adult.geography.description',
    licenseTier: 'free',
    caregiverHintKey: 'adult.geography.hint',
    externalPath: '/geography',
  },
  {
    id: 'adult-history',
    ageBand: '10-plus',
    kind: 'history',
    titleKey: 'adult.history.title',
    descriptionKey: 'adult.history.description',
    licenseTier: 'free',
    caregiverHintKey: 'adult.history.hint',
  },
  {
    id: 'adult-science',
    ageBand: '10-plus',
    kind: 'science',
    titleKey: 'adult.science.title',
    descriptionKey: 'adult.science.description',
    licenseTier: 'free',
    caregiverHintKey: 'adult.science.hint',
  },
  {
    id: 'adult-challenge',
    ageBand: '10-plus',
    kind: 'math',
    titleKey: 'adult.challenge.title',
    descriptionKey: 'adult.challenge.description',
    licenseTier: 'free',
    caregiverHintKey: 'adult.challenge.hint',
  },
];

export function listAdultActivities(): EarlyActivity[] {
  getAgeBand('10-plus');
  return ADULT_ACTIVITIES.filter((a) => a.ageBand === '10-plus');
}

export function getAdultActivity(id: string): EarlyActivity | undefined {
  return listAdultActivities().find((a) => a.id === id);
}

export function listFreeAdultActivities(): EarlyActivity[] {
  return listAdultActivities().filter((a) => a.licenseTier === 'free');
}
