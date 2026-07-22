/**
 * Multiplayer — contracts only (online). Not implemented in MVP.
 *
 * Design goal: same PhaseDefinition / regions as solo.
 * Example mode "claim": each turn a player claims one free region
 * (names it / identifies it) within a time limit; leftover obscure
 * regions go late; highest score wins ("most knowledgeable").
 */

export type MultiplayerModeId = 'claim';

export type MultiplayerRoomStatus =
  | 'lobby'
  | 'in_progress'
  | 'turn_timeout'
  | 'finished';

export interface MultiplayerPlayer {
  id: string;
  displayName: string;
  /** Connected user account id when auth exists. */
  userId?: string;
}

export interface MultiplayerClaimModeConfig {
  id: 'claim';
  /** Seconds for the active player to claim one region. */
  turnSeconds: number;
  /** Points for a correct claim; optional streak later. */
  pointsPerClaim: number;
  /** If true, only unclaimed regions are selectable. */
  exclusiveClaims: true;
}

export interface RegionClaim {
  regionId: string;
  playerId: string;
  claimedAt: number;
  responseMs: number;
  correct: boolean;
  points: number;
}

/**
 * Authoritative room state (server-owned in the future).
 * Client may hold a read-only mirror for UI.
 */
export interface MultiplayerRoom {
  id: string;
  phaseId: string;
  mode: MultiplayerClaimModeConfig;
  status: MultiplayerRoomStatus;
  players: MultiplayerPlayer[];
  /** Order of turns (player ids). */
  turnOrder: string[];
  turnIndex: number;
  turnStartedAt: number;
  turnDeadlineAt: number;
  claims: RegionClaim[];
  /** regionId → playerId for correct claims */
  ownership: Record<string, string>;
  scores: Record<string, number>;
  createdAt: number;
  finishedAt?: number;
  winnerPlayerId?: string | null;
}

export interface MultiplayerTurnAction {
  type: 'claim_region';
  roomId: string;
  playerId: string;
  regionId: string;
  /** Text answer when mode requires naming; optional for tap-identify variants. */
  answerRaw?: string;
  clientTimestamp: number;
}

export type MultiplayerEvent =
  | { type: 'player_joined'; player: MultiplayerPlayer }
  | { type: 'turn_started'; playerId: string; deadlineAt: number }
  | { type: 'claim_resolved'; claim: RegionClaim; nextPlayerId: string | null }
  | { type: 'turn_skipped'; playerId: string; reason: 'timeout' | 'disconnect' }
  | { type: 'match_finished'; winnerPlayerId: string | null; scores: Record<string, number> };

/** Pure helper: regions still available to claim. */
export function remainingRegionIds(
  allRegionIds: string[],
  ownership: Record<string, string>,
): string[] {
  return allRegionIds.filter((id) => ownership[id] == null);
}

export function activePlayerId(room: MultiplayerRoom): string | null {
  if (room.status !== 'in_progress') return null;
  return room.turnOrder[room.turnIndex % room.turnOrder.length] ?? null;
}

export function computeWinner(
  scores: Record<string, number>,
): string | null {
  let bestId: string | null = null;
  let best = -1;
  for (const [id, score] of Object.entries(scores)) {
    if (score > best) {
      best = score;
      bestId = id;
    }
  }
  return bestId;
}
