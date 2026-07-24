import type { EarlyActivity } from './types';
import { assertJuniorSafe, getAgeBand } from './types';

/** Free activities for ages 4–6 (light scoring, no timer / competition). */
export const JUNIOR_ACTIVITIES: EarlyActivity[] = [
  {
    id: 'junior-letters',
    ageBand: '4-6',
    kind: 'letters',
    titleKey: 'junior.letters.title',
    descriptionKey: 'junior.letters.description',
    licenseTier: 'free',
    caregiverHintKey: 'junior.letters.hint',
  },
  {
    id: 'junior-numbers',
    ageBand: '4-6',
    kind: 'numbers',
    titleKey: 'junior.numbers.title',
    descriptionKey: 'junior.numbers.description',
    licenseTier: 'free',
    caregiverHintKey: 'junior.numbers.hint',
  },
  {
    id: 'junior-arithmetic',
    ageBand: '4-6',
    kind: 'arithmetic',
    titleKey: 'junior.arithmetic.title',
    descriptionKey: 'junior.arithmetic.description',
    licenseTier: 'free',
    caregiverHintKey: 'junior.arithmetic.hint',
  },
  {
    id: 'junior-logic',
    ageBand: '4-6',
    kind: 'logic',
    titleKey: 'junior.logic.title',
    descriptionKey: 'junior.logic.description',
    licenseTier: 'free',
    caregiverHintKey: 'junior.logic.hint',
  },
];

export function listJuniorActivities(): EarlyActivity[] {
  const band = getAgeBand('4-6');
  if (band) assertJuniorSafe(band.rules);
  return JUNIOR_ACTIVITIES.filter((a) => a.ageBand === '4-6');
}

export function getJuniorActivity(id: string): EarlyActivity | undefined {
  return listJuniorActivities().find((a) => a.id === id);
}

export function listFreeJuniorActivities(): EarlyActivity[] {
  return listJuniorActivities().filter((a) => a.licenseTier === 'free');
}
