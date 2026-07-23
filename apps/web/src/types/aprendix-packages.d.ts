/**
 * Ambient module shims for monorepo packages (Vite aliases the real sources).
 */
declare module '@aprendix/map-engine' {
  export type LocalizedString = Record<string, string>;
  export type LicenseTier = 'free' | 'module' | 'subscription' | 'school';
  export type Difficulty = 1 | 2 | 3 | 4 | 5;
  export type MapProviderId = string;

  export interface Region {
    id: string;
    names: LocalizedString;
    aliases?: LocalizedString[];
    parentId?: string | null;
    attributes?: Record<string, string | number | boolean | null>;
    meta?: Record<string, unknown>;
  }

  export interface PhaseDefinition {
    id: string;
    moduleId: string;
    titleKey: string;
    descriptionKey: string;
    providerId: MapProviderId;
    geometryRef: string;
    licenseTier: LicenseTier;
    difficulty: Difficulty;
    categories: string[];
    quizAttribute: 'name' | string;
    regions: Region[];
    soloModes: string[];
    multiplayerModes: string[];
    defaultLocale: string;
  }

  export function getRegionLabel(
    region: Region,
    locale: string,
    fallbackLocale?: string,
  ): string;
  export function getQuizAnswer(
    region: Region,
    quizAttribute: string,
    locale: string,
    fallbackLocale?: string,
  ): string;
  export function listQuizAnswers(
    region: Region,
    quizAttribute: string,
    locale: string,
    fallbackLocale?: string,
  ): string[];
  export function findRegion(regions: Region[], id: string): Region | undefined;
  export function shuffleIds(ids: string[], random?: () => number): string[];
}

declare module '@aprendix/game-core' {
  import type { PhaseDefinition, Region } from '@aprendix/map-engine';

  export type SoloModeId = 'train' | 'find' | 'name';
  export type SessionStatus = 'idle' | 'playing' | 'feedback' | 'completed';

  export interface ModeConfig {
    id: SoloModeId;
    nameKey: string;
    descriptionKey: string;
    scoringEnabled: boolean;
    immediateFeedback: boolean;
    inputType: 'tap' | 'text';
    advanceOnAnswer: boolean;
  }

  export const SOLO_MODES: Record<SoloModeId, ModeConfig>;

  export interface AttemptRecord {
    regionId: string;
    correct: boolean;
    responseMs: number;
    answerRaw?: string;
    expected?: string;
  }

  export interface SessionSnapshot {
    id: string;
    profileId: string;
    phaseId: string;
    modeId: SoloModeId;
    status: SessionStatus;
    queue: string[];
    cursor: number;
    attempts: AttemptRecord[];
    score: number;
    streak: number;
    maxStreak: number;
    startedAt: number;
    endedAt?: number;
    currentRegionId: string | null;
    lastFeedback?: {
      correct: boolean;
      regionId: string;
      expectedLabel: string;
    };
  }

  export interface StoredSession {
    id: string;
    profileId: string;
    phaseId: string;
    modeId: SoloModeId;
    startedAt: number;
    endedAt: number;
    score: number;
    correct: number;
    total: number;
    accuracy: number;
    maxStreak: number;
    avgResponseMs: number;
    uniqueCorrect: number;
  }

  export interface PhaseStats {
    phaseId: string;
    sessionsPlayed: number;
    bestUniqueCorrect: number;
    previousBestUniqueCorrect: number;
    bestScore: number;
    lastSessionAt?: number;
  }

  export function createSession(options: {
    phase: PhaseDefinition;
    modeId: SoloModeId;
    profileId?: string;
    random?: () => number;
    idFactory?: () => string;
  }): SessionSnapshot;

  export function getCurrentRegion(
    session: SessionSnapshot,
    phase: PhaseDefinition,
  ): Region | undefined;

  export function submitTapAnswer(
    session: SessionSnapshot,
    phase: PhaseDefinition,
    selectedRegionId: string,
    responseMs: number,
  ): SessionSnapshot;

  export function submitTextAnswer(
    session: SessionSnapshot,
    phase: PhaseDefinition,
    rawAnswer: string,
    responseMs: number,
    locale?: string,
  ): SessionSnapshot;

  export function acknowledgeFeedback(session: SessionSnapshot): SessionSnapshot;
  export function sessionSummary(session: SessionSnapshot): {
    total: number;
    correct: number;
    accuracy: number;
    avgResponseMs: number;
    score: number;
    maxStreak: number;
  };
  export function uniqueCorrectCount(session: SessionSnapshot): number;
  export function toStoredSession(session: SessionSnapshot): StoredSession;
  export function evolutionFromHistory(
    history: StoredSession[],
    phaseId: string,
    modeId?: SoloModeId,
  ): { before: number; after: number; improved: boolean };
  export function aggregatePhaseStats(
    history: StoredSession[],
    phaseId: string,
  ): PhaseStats;

  export type MultiplayerModeId = 'claim';
}

declare module '@aprendix/content-geography' {
  import type { PhaseDefinition } from '@aprendix/map-engine';

  export const BR_STATES_PHASE: PhaseDefinition;
  export const GEOGRAPHY_PHASES: PhaseDefinition[];
  export function getPhaseById(id: string): PhaseDefinition | undefined;
  export function listFreePhases(): PhaseDefinition[];
}

declare module '@aprendix/early-years' {
  export type AgeBandId =
    | '0-1'
    | '1-2'
    | '2-4'
    | '4-6'
    | '6-10'
    | '10-plus';

  export type LicenseTier = 'free' | 'module' | 'subscription' | 'school';

  export interface AgeBandRules {
    scoring: boolean;
    timer: boolean;
    competition: boolean;
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

  export type PreschoolActivityKind =
    | 'memory'
    | 'association'
    | 'sequences'
    | 'words'
    | 'counting'
    | 'puzzle';

  export interface EarlyActivity {
    id: string;
    ageBand: AgeBandId;
    kind: BabyActivityKind | ToddlerActivityKind | PreschoolActivityKind | string;
    titleKey: string;
    descriptionKey: string;
    licenseTier: LicenseTier;
    caregiverHintKey?: string;
  }

  export const AGE_BANDS: AgeBandDefinition[];
  export const BABY_ACTIVITIES: EarlyActivity[];
  export const TODDLER_ACTIVITIES: EarlyActivity[];
  export const PRESCHOOL_ACTIVITIES: EarlyActivity[];
  export function getAgeBand(id: AgeBandId): AgeBandDefinition | undefined;
  export function assertBabySafe(rules: AgeBandRules): void;
  export function assertToddlerSafe(rules: AgeBandRules): void;
  export function assertPreschoolSafe(rules: AgeBandRules): void;
  export function listBabyActivities(): EarlyActivity[];
  export function getBabyActivity(id: string): EarlyActivity | undefined;
  export function listFreeBabyActivities(): EarlyActivity[];
  export function listToddlerActivities(): EarlyActivity[];
  export function getToddlerActivity(id: string): EarlyActivity | undefined;
  export function listFreeToddlerActivities(): EarlyActivity[];
  export function listPreschoolActivities(): EarlyActivity[];
  export function getPreschoolActivity(id: string): EarlyActivity | undefined;
  export function listFreePreschoolActivities(): EarlyActivity[];
}
