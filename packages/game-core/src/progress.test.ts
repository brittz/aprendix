import { describe, expect, it } from 'vitest';
import {
  answersMatch,
  normalizeAnswer,
  scoreAttempt,
  topMissedRegions,
  type StoredSession,
} from './index';

describe('normalizeAnswer / answersMatch', () => {
  it('ignores accents and case', () => {
    expect(normalizeAnswer('São Paulo')).toBe('sao paulo');
    expect(answersMatch(['São Paulo', 'SP'], 'sao paulo')).toBe(true);
    expect(answersMatch(['São Paulo'], 'rio')).toBe(false);
  });
});

describe('scoreAttempt', () => {
  it('returns zero when scoring disabled or wrong', () => {
    expect(
      scoreAttempt({
        correct: true,
        streakBefore: 2,
        responseMs: 1000,
        scoringEnabled: false,
      }).total,
    ).toBe(0);
    expect(
      scoreAttempt({
        correct: false,
        streakBefore: 2,
        responseMs: 1000,
        scoringEnabled: true,
      }).total,
    ).toBe(0);
  });

  it('adds base, streak and speed bonuses', () => {
    const points = scoreAttempt({
      correct: true,
      streakBefore: 2,
      responseMs: 0,
      scoringEnabled: true,
    });
    expect(points.base).toBe(100);
    expect(points.streakBonus).toBe(30);
    expect(points.speedBonus).toBe(40);
    expect(points.total).toBe(170);
  });
});

describe('topMissedRegions', () => {
  it('ranks regions by miss count', () => {
    const history: StoredSession[] = [
      {
        id: '1',
        profileId: 'local',
        phaseId: 'br-states',
        modeId: 'find',
        startedAt: 1,
        endedAt: 2,
        score: 0,
        correct: 0,
        total: 2,
        accuracy: 0,
        maxStreak: 0,
        avgResponseMs: 1000,
        uniqueCorrect: 0,
        missesByRegion: { SP: 2, RJ: 1 },
        attemptsByRegion: { SP: 2, RJ: 1 },
      },
      {
        id: '2',
        profileId: 'local',
        phaseId: 'br-states',
        modeId: 'name',
        startedAt: 3,
        endedAt: 4,
        score: 0,
        correct: 0,
        total: 1,
        accuracy: 0,
        maxStreak: 0,
        avgResponseMs: 1000,
        uniqueCorrect: 0,
        missesByRegion: { SP: 1 },
        attemptsByRegion: { SP: 1 },
      },
    ];

    const top = topMissedRegions(history, 'br-states', 2);
    expect(top[0]?.regionId).toBe('SP');
    expect(top[0]?.misses).toBe(3);
    expect(top[1]?.regionId).toBe('RJ');
  });
});
