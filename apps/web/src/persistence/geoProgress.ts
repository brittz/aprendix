import type { StoredSession } from '@aprendix/game-core';

const SESSIONS_KEY = 'aprendix.geo.sessions.v1';
const LAST_KEY = 'aprendix.lastPlayed.v1';
const PROFILE_KEY = 'aprendix.profile.v1';

export interface LastPlayed {
  module: 'geography' | 'babies' | 'toddlers';
  phaseId?: string;
  modeId?: string;
  activityId?: string;
  title: string;
  updatedAt: number;
}

export interface LocalProfile {
  displayName: string;
}

function canUseStorage() {
  return typeof localStorage !== 'undefined';
}

export function loadSessions(): StoredSession[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSession(session: StoredSession): StoredSession[] {
  const history = [...loadSessions(), session];
  if (canUseStorage()) {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(history));
  }
  return history;
}

export function clearSessions() {
  if (canUseStorage()) localStorage.removeItem(SESSIONS_KEY);
}

export function saveLastPlayed(entry: LastPlayed) {
  if (canUseStorage()) {
    localStorage.setItem(LAST_KEY, JSON.stringify(entry));
  }
}

export function loadLastPlayed(): LastPlayed | null {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(LAST_KEY);
    return raw ? (JSON.parse(raw) as LastPlayed) : null;
  } catch {
    return null;
  }
}

export function loadProfile(): LocalProfile {
  if (!canUseStorage()) return { displayName: 'Ana' };
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { displayName: 'Ana' };
    return JSON.parse(raw) as LocalProfile;
  } catch {
    return { displayName: 'Ana' };
  }
}

export function totalScore(sessions: StoredSession[] = loadSessions()): number {
  return sessions.reduce((sum, s) => sum + s.score, 0);
}

export function sessionsPlayed(sessions: StoredSession[] = loadSessions()): number {
  return sessions.length;
}

export function averageAccuracy(sessions: StoredSession[] = loadSessions()): number {
  if (sessions.length === 0) return 0;
  const sum = sessions.reduce((acc, s) => acc + s.accuracy, 0);
  return Math.round((sum / sessions.length) * 100);
}
