import type { SoloModeId } from './solo';
import { sessionSummary, uniqueCorrectCount, type SessionSnapshot } from './solo';

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
  /** Unique regions correct — used for “18 → 25” evolution. */
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

export function toStoredSession(session: SessionSnapshot): StoredSession {
  const summary = sessionSummary(session);
  return {
    id: session.id,
    profileId: session.profileId,
    phaseId: session.phaseId,
    modeId: session.modeId,
    startedAt: session.startedAt,
    endedAt: session.endedAt ?? Date.now(),
    score: summary.score,
    correct: summary.correct,
    total: summary.total,
    accuracy: summary.accuracy,
    maxStreak: summary.maxStreak,
    avgResponseMs: summary.avgResponseMs,
    uniqueCorrect: uniqueCorrectCount(session),
  };
}

export function evolutionFromHistory(
  history: StoredSession[],
  phaseId: string,
  modeId?: SoloModeId,
): { before: number; after: number; improved: boolean } {
  const filtered = history
    .filter((s) => s.phaseId === phaseId && (modeId ? s.modeId === modeId : true))
    .sort((a, b) => a.endedAt - b.endedAt);

  if (filtered.length === 0) {
    return { before: 0, after: 0, improved: false };
  }

  const latest = filtered[filtered.length - 1]!;
  const prior = filtered.slice(0, -1);
  const before =
    prior.length === 0
      ? 0
      : Math.max(...prior.map((s) => s.uniqueCorrect));
  const after = Math.max(before, latest.uniqueCorrect);
  return {
    before,
    after: latest.uniqueCorrect,
    improved: latest.uniqueCorrect > before,
  };
}

export function aggregatePhaseStats(
  history: StoredSession[],
  phaseId: string,
): PhaseStats {
  const filtered = history
    .filter((s) => s.phaseId === phaseId)
    .sort((a, b) => a.endedAt - b.endedAt);

  let bestUniqueCorrect = 0;
  let previousBestUniqueCorrect = 0;
  let bestScore = 0;

  for (const session of filtered) {
    previousBestUniqueCorrect = bestUniqueCorrect;
    bestUniqueCorrect = Math.max(bestUniqueCorrect, session.uniqueCorrect);
    bestScore = Math.max(bestScore, session.score);
  }

  return {
    phaseId,
    sessionsPlayed: filtered.length,
    bestUniqueCorrect,
    previousBestUniqueCorrect,
    bestScore,
    lastSessionAt: filtered[filtered.length - 1]?.endedAt,
  };
}
