import type { PhaseDefinition, Region } from '@aprendix/map-engine';
import {
  findRegion,
  listQuizAnswers,
  shuffleIds,
} from '@aprendix/map-engine';

export type SoloModeId = 'train' | 'find' | 'name';

export type SessionStatus =
  | 'idle'
  | 'playing'
  | 'feedback'
  | 'completed';

export interface ModeConfig {
  id: SoloModeId;
  nameKey: string;
  descriptionKey: string;
  scoringEnabled: boolean;
  immediateFeedback: boolean;
  inputType: 'tap' | 'text';
  /** When true, wrong answers still advance (find/name). Train may stay. */
  advanceOnAnswer: boolean;
}

export const SOLO_MODES: Record<SoloModeId, ModeConfig> = {
  train: {
    id: 'train',
    nameKey: 'modes.train.name',
    descriptionKey: 'modes.train.description',
    scoringEnabled: false,
    immediateFeedback: true,
    inputType: 'tap',
    advanceOnAnswer: true,
  },
  find: {
    id: 'find',
    nameKey: 'modes.find.name',
    descriptionKey: 'modes.find.description',
    scoringEnabled: true,
    immediateFeedback: true,
    inputType: 'tap',
    advanceOnAnswer: true,
  },
  name: {
    id: 'name',
    nameKey: 'modes.name.name',
    descriptionKey: 'modes.name.description',
    scoringEnabled: true,
    immediateFeedback: true,
    inputType: 'text',
    advanceOnAnswer: true,
  },
};

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
  /** Region currently asked */
  currentRegionId: string | null;
  lastFeedback?: {
    correct: boolean;
    regionId: string;
    expectedLabel: string;
  };
}

export interface ScoreBreakdown {
  base: number;
  streakBonus: number;
  speedBonus: number;
  total: number;
}

const BASE_CORRECT = 100;
const STREAK_STEP = 15;
const SPEED_WINDOW_MS = 8000;

export function normalizeAnswer(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function answersMatch(expectedList: string[], raw: string): boolean {
  const normalized = normalizeAnswer(raw);
  if (!normalized) return false;
  return expectedList.some((expected) => normalizeAnswer(expected) === normalized);
}

export function scoreAttempt(options: {
  correct: boolean;
  streakBefore: number;
  responseMs: number;
  scoringEnabled: boolean;
}): ScoreBreakdown {
  if (!options.scoringEnabled || !options.correct) {
    return { base: 0, streakBonus: 0, speedBonus: 0, total: 0 };
  }
  const base = BASE_CORRECT;
  const streakBonus = options.streakBefore * STREAK_STEP;
  const speedRatio = Math.max(0, 1 - options.responseMs / SPEED_WINDOW_MS);
  const speedBonus = Math.round(40 * speedRatio);
  return {
    base,
    streakBonus,
    speedBonus,
    total: base + streakBonus + speedBonus,
  };
}

export function createSession(options: {
  phase: PhaseDefinition;
  modeId: SoloModeId;
  profileId?: string;
  random?: () => number;
  idFactory?: () => string;
}): SessionSnapshot {
  const queue = shuffleIds(
    options.phase.regions.map((r) => r.id),
    options.random,
  );
  const id =
    options.idFactory?.() ??
    `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    id,
    profileId: options.profileId ?? 'local',
    phaseId: options.phase.id,
    modeId: options.modeId,
    status: 'playing',
    queue,
    cursor: 0,
    attempts: [],
    score: 0,
    streak: 0,
    maxStreak: 0,
    startedAt: Date.now(),
    currentRegionId: queue[0] ?? null,
  };
}

export function getCurrentRegion(
  session: SessionSnapshot,
  phase: PhaseDefinition,
): Region | undefined {
  if (!session.currentRegionId) return undefined;
  return findRegion(phase.regions, session.currentRegionId);
}

function finishIfDone(session: SessionSnapshot): SessionSnapshot {
  if (session.cursor >= session.queue.length) {
    return {
      ...session,
      status: 'completed',
      currentRegionId: null,
      endedAt: Date.now(),
      lastFeedback: session.lastFeedback,
    };
  }
  return {
    ...session,
    status: 'playing',
    currentRegionId: session.queue[session.cursor] ?? null,
  };
}

export function submitTapAnswer(
  session: SessionSnapshot,
  phase: PhaseDefinition,
  selectedRegionId: string,
  responseMs: number,
): SessionSnapshot {
  if (session.status !== 'playing' || !session.currentRegionId) return session;
  const mode = SOLO_MODES[session.modeId];
  const expectedId = session.currentRegionId;
  const correct = selectedRegionId === expectedId;
  const region = findRegion(phase.regions, expectedId);
  const expectedLabel = region
    ? listQuizAnswers(region, phase.quizAttribute, phase.defaultLocale)[0]
    : expectedId;

  const points = scoreAttempt({
    correct,
    streakBefore: session.streak,
    responseMs,
    scoringEnabled: mode.scoringEnabled,
  });

  const streak = correct ? session.streak + 1 : 0;
  const next: SessionSnapshot = {
    ...session,
    attempts: [
      ...session.attempts,
      {
        regionId: expectedId,
        correct,
        responseMs,
        answerRaw: selectedRegionId,
        expected: expectedId,
      },
    ],
    score: session.score + points.total,
    streak,
    maxStreak: Math.max(session.maxStreak, streak),
    cursor: session.cursor + 1,
    lastFeedback: {
      correct,
      regionId: expectedId,
      expectedLabel,
    },
    status: 'feedback',
  };

  return finishIfDone(next);
}

export function submitTextAnswer(
  session: SessionSnapshot,
  phase: PhaseDefinition,
  rawAnswer: string,
  responseMs: number,
  locale = phase.defaultLocale,
): SessionSnapshot {
  if (session.status !== 'playing' || !session.currentRegionId) return session;
  const mode = SOLO_MODES[session.modeId];
  const region = findRegion(phase.regions, session.currentRegionId);
  if (!region) return session;

  const expectedList = listQuizAnswers(region, phase.quizAttribute, locale);
  const correct = answersMatch(expectedList, rawAnswer);
  const points = scoreAttempt({
    correct,
    streakBefore: session.streak,
    responseMs,
    scoringEnabled: mode.scoringEnabled,
  });

  const streak = correct ? session.streak + 1 : 0;
  const next: SessionSnapshot = {
    ...session,
    attempts: [
      ...session.attempts,
      {
        regionId: region.id,
        correct,
        responseMs,
        answerRaw: rawAnswer,
        expected: expectedList[0],
      },
    ],
    score: session.score + points.total,
    streak,
    maxStreak: Math.max(session.maxStreak, streak),
    cursor: session.cursor + 1,
    lastFeedback: {
      correct,
      regionId: region.id,
      expectedLabel: expectedList[0] ?? region.id,
    },
    status: 'feedback',
  };

  return finishIfDone(next);
}

/** Clear feedback banner and continue (already advanced cursor). */
export function acknowledgeFeedback(session: SessionSnapshot): SessionSnapshot {
  if (session.status === 'completed') return session;
  if (session.status !== 'feedback') return session;
  return { ...session, status: 'playing', lastFeedback: undefined };
}

export function sessionSummary(session: SessionSnapshot) {
  const total = session.attempts.length;
  const correct = session.attempts.filter((a) => a.correct).length;
  const accuracy = total === 0 ? 0 : correct / total;
  const avgResponseMs =
    total === 0
      ? 0
      : Math.round(
          session.attempts.reduce((sum, a) => sum + a.responseMs, 0) / total,
        );
  return {
    total,
    correct,
    accuracy,
    avgResponseMs,
    score: session.score,
    maxStreak: session.maxStreak,
  };
}

/** Unique regions answered correctly at least once in the session. */
export function uniqueCorrectCount(session: SessionSnapshot): number {
  return new Set(session.attempts.filter((a) => a.correct).map((a) => a.regionId))
    .size;
}
