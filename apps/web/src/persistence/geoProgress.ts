import type { StoredSession } from '@aprendix/game-core';

const STORAGE_KEY = 'aprendix.geo.sessions.v1';

function canUseStorage() {
  return typeof localStorage !== 'undefined';
}

export function loadSessions(): StoredSession[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
  return history;
}

export function clearSessions() {
  if (canUseStorage()) localStorage.removeItem(STORAGE_KEY);
}
