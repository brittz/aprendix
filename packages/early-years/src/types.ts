export type AgeBandId =
  | '0-1'
  | '1-2'
  | '2-4'
  | '4-6'
  | '6-10'
  | '10-plus';

export type LicenseTier = 'free' | 'module' | 'subscription' | 'school';

/**
 * Hard rules for an age band. Baby band forbids score/timer/competition.
 */
export interface AgeBandRules {
  scoring: boolean;
  timer: boolean;
  competition: boolean;
  /** Soft cap for a calm session (touches); never a hard fail. */
  suggestedTouchBudget?: number;
}

export interface AgeBandDefinition {
  id: AgeBandId;
  titleKey: string;
  descriptionKey: string;
  rules: AgeBandRules;
}

export type BabyActivityKind =
  | 'animals'
  | 'sounds'
  | 'objects'
  | 'colors'
  | 'cause-effect'
  | 'music'
  | 'rhythm';

export type ToddlerActivityKind =
  | 'shapes'
  | 'colors'
  | 'fruits'
  | 'animals'
  | 'body'
  | 'size'
  | 'same-diff';

export interface EarlyActivity {
  id: string;
  ageBand: AgeBandId;
  kind: BabyActivityKind | ToddlerActivityKind | string;
  titleKey: string;
  descriptionKey: string;
  licenseTier: LicenseTier;
  /** For caregivers only — never shown as score to the child. */
  caregiverHintKey?: string;
}

export const AGE_BANDS: AgeBandDefinition[] = [
  {
    id: '0-1',
    titleKey: 'bands.0-1.title',
    descriptionKey: 'bands.0-1.description',
    rules: {
      scoring: false,
      timer: false,
      competition: false,
      suggestedTouchBudget: 8,
    },
  },
  {
    id: '1-2',
    titleKey: 'bands.1-2.title',
    descriptionKey: 'bands.1-2.description',
    rules: {
      scoring: false,
      timer: false,
      competition: false,
      suggestedTouchBudget: 10,
    },
  },
  {
    id: '2-4',
    titleKey: 'bands.2-4.title',
    descriptionKey: 'bands.2-4.description',
    rules: { scoring: false, timer: false, competition: false },
  },
  {
    id: '4-6',
    titleKey: 'bands.4-6.title',
    descriptionKey: 'bands.4-6.description',
    rules: { scoring: true, timer: false, competition: false },
  },
  {
    id: '6-10',
    titleKey: 'bands.6-10.title',
    descriptionKey: 'bands.6-10.description',
    rules: { scoring: true, timer: false, competition: false },
  },
  {
    id: '10-plus',
    titleKey: 'bands.10-plus.title',
    descriptionKey: 'bands.10-plus.description',
    rules: { scoring: true, timer: true, competition: true },
  },
];

export function getAgeBand(id: AgeBandId): AgeBandDefinition | undefined {
  return AGE_BANDS.find((band) => band.id === id);
}

/** Assert early-years safety (0–1 and 1–2): no score/timer/competition. */
export function assertBabySafe(rules: AgeBandRules): void {
  if (rules.scoring || rules.timer || rules.competition) {
    throw new Error('Early band cannot enable scoring, timer, or competition');
  }
}

export const assertToddlerSafe = assertBabySafe;
