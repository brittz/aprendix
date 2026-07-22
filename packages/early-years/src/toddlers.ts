import type { EarlyActivity } from './types';
import { assertToddlerSafe, getAgeBand } from './types';

/** Free activities for ages 1–2 (no score / timer / competition). */
export const TODDLER_ACTIVITIES: EarlyActivity[] = [
  {
    id: 'toddler-shapes',
    ageBand: '1-2',
    kind: 'shapes',
    titleKey: 'toddler.shapes.title',
    descriptionKey: 'toddler.shapes.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.shapes.hint',
  },
  {
    id: 'toddler-colors',
    ageBand: '1-2',
    kind: 'colors',
    titleKey: 'toddler.colors.title',
    descriptionKey: 'toddler.colors.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.colors.hint',
  },
  {
    id: 'toddler-fruits',
    ageBand: '1-2',
    kind: 'fruits',
    titleKey: 'toddler.fruits.title',
    descriptionKey: 'toddler.fruits.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.fruits.hint',
  },
  {
    id: 'toddler-animals',
    ageBand: '1-2',
    kind: 'animals',
    titleKey: 'toddler.animals.title',
    descriptionKey: 'toddler.animals.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.animals.hint',
  },
  {
    id: 'toddler-body',
    ageBand: '1-2',
    kind: 'body',
    titleKey: 'toddler.body.title',
    descriptionKey: 'toddler.body.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.body.hint',
  },
  {
    id: 'toddler-size',
    ageBand: '1-2',
    kind: 'size',
    titleKey: 'toddler.size.title',
    descriptionKey: 'toddler.size.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.size.hint',
  },
  {
    id: 'toddler-same-diff',
    ageBand: '1-2',
    kind: 'same-diff',
    titleKey: 'toddler.sameDiff.title',
    descriptionKey: 'toddler.sameDiff.description',
    licenseTier: 'free',
    caregiverHintKey: 'toddler.sameDiff.hint',
  },
];

export function listToddlerActivities(): EarlyActivity[] {
  const band = getAgeBand('1-2');
  if (band) assertToddlerSafe(band.rules);
  return TODDLER_ACTIVITIES.filter((a) => a.ageBand === '1-2');
}

export function getToddlerActivity(id: string): EarlyActivity | undefined {
  return listToddlerActivities().find((a) => a.id === id);
}

export function listFreeToddlerActivities(): EarlyActivity[] {
  return listToddlerActivities().filter((a) => a.licenseTier === 'free');
}
