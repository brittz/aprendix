export {
  SOLO_MODES,
  acknowledgeFeedback,
  answersMatch,
  createSession,
  getCurrentRegion,
  normalizeAnswer,
  scoreAttempt,
  sessionSummary,
  submitTapAnswer,
  submitTextAnswer,
  uniqueCorrectCount,
  type AttemptRecord,
  type ModeConfig,
  type ScoreBreakdown,
  type SessionSnapshot,
  type SessionStatus,
  type SoloModeId,
} from './solo';

export {
  activePlayerId,
  computeWinner,
  remainingRegionIds,
  type MultiplayerClaimModeConfig,
  type MultiplayerEvent,
  type MultiplayerModeId,
  type MultiplayerPlayer,
  type MultiplayerRoom,
  type MultiplayerRoomStatus,
  type MultiplayerTurnAction,
  type RegionClaim,
} from './multiplayer';

export {
  aggregatePhaseStats,
  evolutionFromHistory,
  toStoredSession,
  type PhaseStats,
  type StoredSession,
} from './progress';
