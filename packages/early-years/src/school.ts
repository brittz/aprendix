import type { EarlyActivity } from './types';
import { assertSchoolSafe, getAgeBand } from './types';

/** Free catalog for ages 6–10 (scoring OK; no competition by default). */
export const SCHOOL_ACTIVITIES: EarlyActivity[] = [
  {
    id: 'school-geography',
    ageBand: '6-10',
    kind: 'geography',
    titleKey: 'school.geography.title',
    descriptionKey: 'school.geography.description',
    licenseTier: 'free',
    caregiverHintKey: 'school.geography.hint',
    externalPath: '/geography',
  },
  {
    id: 'school-history',
    ageBand: '6-10',
    kind: 'history',
    titleKey: 'school.history.title',
    descriptionKey: 'school.history.description',
    licenseTier: 'free',
    caregiverHintKey: 'school.history.hint',
  },
  {
    id: 'school-science',
    ageBand: '6-10',
    kind: 'science',
    titleKey: 'school.science.title',
    descriptionKey: 'school.science.description',
    licenseTier: 'free',
    caregiverHintKey: 'school.science.hint',
  },
  {
    id: 'school-languages',
    ageBand: '6-10',
    kind: 'languages',
    titleKey: 'school.languages.title',
    descriptionKey: 'school.languages.description',
    licenseTier: 'free',
    caregiverHintKey: 'school.languages.hint',
  },
  {
    id: 'school-math',
    ageBand: '6-10',
    kind: 'math',
    titleKey: 'school.math.title',
    descriptionKey: 'school.math.description',
    licenseTier: 'free',
    caregiverHintKey: 'school.math.hint',
  },
];

export function listSchoolActivities(): EarlyActivity[] {
  const band = getAgeBand('6-10');
  if (band) assertSchoolSafe(band.rules);
  return SCHOOL_ACTIVITIES.filter((a) => a.ageBand === '6-10');
}

export function getSchoolActivity(id: string): EarlyActivity | undefined {
  return listSchoolActivities().find((a) => a.id === id);
}

export function listFreeSchoolActivities(): EarlyActivity[] {
  return listSchoolActivities().filter((a) => a.licenseTier === 'free');
}
