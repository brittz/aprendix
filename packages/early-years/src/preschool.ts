import type { EarlyActivity } from './types';
import { assertPreschoolSafe, getAgeBand } from './types';

/** Free activities for ages 2–4 (no score / timer / competition). */
export const PRESCHOOL_ACTIVITIES: EarlyActivity[] = [
  {
    id: 'preschool-memory',
    ageBand: '2-4',
    kind: 'memory',
    titleKey: 'preschool.memory.title',
    descriptionKey: 'preschool.memory.description',
    licenseTier: 'free',
    caregiverHintKey: 'preschool.memory.hint',
  },
  {
    id: 'preschool-association',
    ageBand: '2-4',
    kind: 'association',
    titleKey: 'preschool.association.title',
    descriptionKey: 'preschool.association.description',
    licenseTier: 'free',
    caregiverHintKey: 'preschool.association.hint',
  },
  {
    id: 'preschool-sequences',
    ageBand: '2-4',
    kind: 'sequences',
    titleKey: 'preschool.sequences.title',
    descriptionKey: 'preschool.sequences.description',
    licenseTier: 'free',
    caregiverHintKey: 'preschool.sequences.hint',
  },
  {
    id: 'preschool-words',
    ageBand: '2-4',
    kind: 'words',
    titleKey: 'preschool.words.title',
    descriptionKey: 'preschool.words.description',
    licenseTier: 'free',
    caregiverHintKey: 'preschool.words.hint',
  },
  {
    id: 'preschool-counting',
    ageBand: '2-4',
    kind: 'counting',
    titleKey: 'preschool.counting.title',
    descriptionKey: 'preschool.counting.description',
    licenseTier: 'free',
    caregiverHintKey: 'preschool.counting.hint',
  },
  {
    id: 'preschool-puzzle',
    ageBand: '2-4',
    kind: 'puzzle',
    titleKey: 'preschool.puzzle.title',
    descriptionKey: 'preschool.puzzle.description',
    licenseTier: 'free',
    caregiverHintKey: 'preschool.puzzle.hint',
  },
];

export function listPreschoolActivities(): EarlyActivity[] {
  const band = getAgeBand('2-4');
  if (band) assertPreschoolSafe(band.rules);
  return PRESCHOOL_ACTIVITIES.filter((a) => a.ageBand === '2-4');
}

export function getPreschoolActivity(id: string): EarlyActivity | undefined {
  return listPreschoolActivities().find((a) => a.id === id);
}

export function listFreePreschoolActivities(): EarlyActivity[] {
  return listPreschoolActivities().filter((a) => a.licenseTier === 'free');
}
