import type { EarlyActivity } from './types';
import { getAgeBand, assertBabySafe } from './types';

/** Free sample + full free set for MVP babies (acquisition trust). */
export const BABY_ACTIVITIES: EarlyActivity[] = [
  {
    id: 'baby-animals',
    ageBand: '0-1',
    kind: 'animals',
    titleKey: 'baby.animals.title',
    descriptionKey: 'baby.animals.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.animals.hint',
  },
  {
    id: 'baby-colors',
    ageBand: '0-1',
    kind: 'colors',
    titleKey: 'baby.colors.title',
    descriptionKey: 'baby.colors.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.colors.hint',
  },
  {
    id: 'baby-cause-effect',
    ageBand: '0-1',
    kind: 'cause-effect',
    titleKey: 'baby.causeEffect.title',
    descriptionKey: 'baby.causeEffect.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.causeEffect.hint',
  },
  {
    id: 'baby-sounds',
    ageBand: '0-1',
    kind: 'sounds',
    titleKey: 'baby.sounds.title',
    descriptionKey: 'baby.sounds.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.sounds.hint',
  },
  {
    id: 'baby-objects',
    ageBand: '0-1',
    kind: 'objects',
    titleKey: 'baby.objects.title',
    descriptionKey: 'baby.objects.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.objects.hint',
  },
  {
    id: 'baby-music',
    ageBand: '0-1',
    kind: 'music',
    titleKey: 'baby.music.title',
    descriptionKey: 'baby.music.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.music.hint',
  },
  {
    id: 'baby-rhythm',
    ageBand: '0-1',
    kind: 'rhythm',
    titleKey: 'baby.rhythm.title',
    descriptionKey: 'baby.rhythm.description',
    licenseTier: 'free',
    caregiverHintKey: 'baby.rhythm.hint',
  },
];

export function listBabyActivities(): EarlyActivity[] {
  const band = getAgeBand('0-1');
  if (band) assertBabySafe(band.rules);
  return BABY_ACTIVITIES.filter((a) => a.ageBand === '0-1');
}

export function getBabyActivity(id: string): EarlyActivity | undefined {
  return listBabyActivities().find((a) => a.id === id);
}

export function listFreeBabyActivities(): EarlyActivity[] {
  return listBabyActivities().filter((a) => a.licenseTier === 'free');
}
