import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PhaseDefinition } from '@aprendix/map-engine';
import { getRegionLabel } from '@aprendix/map-engine';
import {
  acknowledgeFeedback,
  createSession,
  getCurrentRegion,
  submitTapAnswer,
  submitTextAnswer,
  toStoredSession,
  type SessionSnapshot,
  type SoloModeId,
} from '@aprendix/game-core';
import { saveSession, loadSessions } from '../../../persistence/geoProgress';

const FEEDBACK_MS = 900;

export function useGeoSession(phase: PhaseDefinition, modeId: SoloModeId) {
  const [session, setSession] = useState<SessionSnapshot>(() =>
    createSession({ phase, modeId }),
  );
  const promptStartedAt = useRef(Date.now());
  const [textValue, setTextValue] = useState('');
  const [persisted, setPersisted] = useState(false);

  useEffect(() => {
    promptStartedAt.current = Date.now();
    setTextValue('');
  }, [session.currentRegionId, session.status]);

  useEffect(() => {
    if (session.status !== 'completed' || persisted) return;
    const alreadySaved = loadSessions().some((item) => item.id === session.id);
    if (!alreadySaved) {
      saveSession(toStoredSession(session));
    }
    setPersisted(true);
  }, [session, persisted]);

  const currentRegion = useMemo(
    () => getCurrentRegion(session, phase),
    [session, phase],
  );

  const currentLabel = currentRegion
    ? getRegionLabel(currentRegion, phase.defaultLocale)
    : '';

  const elapsed = () => Date.now() - promptStartedAt.current;

  const onRegionClick = useCallback(
    (regionId: string) => {
      if (session.status !== 'playing') return;
      if (modeId === 'name') return;
      setSession((prev) => submitTapAnswer(prev, phase, regionId, elapsed()));
    },
    [session.status, modeId, phase],
  );

  const onSubmitText = useCallback(() => {
    if (session.status !== 'playing' || modeId !== 'name') return;
    setSession((prev) =>
      submitTextAnswer(prev, phase, textValue, elapsed()),
    );
  }, [session.status, modeId, phase, textValue]);

  const continueAfterFeedback = useCallback(() => {
    setSession((prev) => acknowledgeFeedback(prev));
  }, []);

  // Auto-advance after short feedback in tap modes
  useEffect(() => {
    if (session.status !== 'feedback') return;
    if (modeId === 'name') return;
    const timer = window.setTimeout(() => {
      setSession((prev) => acknowledgeFeedback(prev));
    }, FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [session.status, session.cursor, modeId]);

  const fillOverrides = useMemo(() => {
    const fills: Record<string, string> = {};
    if (modeId === 'name' && session.currentRegionId && session.status === 'playing') {
      fills[session.currentRegionId] = '#6a5ae0';
    }
    if (session.lastFeedback) {
      fills[session.lastFeedback.regionId] = session.lastFeedback.correct
        ? '#22c55e'
        : '#ef4444';
    }
    return fills;
  }, [modeId, session]);

  const restart = useCallback(() => {
    setPersisted(false);
    setSession(createSession({ phase, modeId }));
  }, [phase, modeId]);

  return {
    session,
    currentRegion,
    currentLabel,
    textValue,
    setTextValue,
    onRegionClick,
    onSubmitText,
    continueAfterFeedback,
    fillOverrides,
    restart,
  };
}
