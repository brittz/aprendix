# 12 — Data Model

Modelo lógico inicial (independente de ORM). Persistência local no MVP; API depois.

## User & Profile

```text
User
  id, createdAt, authProvider?, subscriptionTier

Profile
  id, userId, displayName, birthYear?, ageBand
  settings: { sfx, music, reducedMotion, locale }
```

## Content

```text
MapDefinition
  id, titleKey, difficulty, categories[], providerId, licenseTier

Region
  id, mapId, names{}, capitalId?, parentId?, meta{}

GameModeConfig
  id, scoringEnabled, timer*, lives*, inputType, minAge
```

## Play

```text
Session
  id, profileId, mapId, modeId, startedAt, endedAt
  score, accuracy, maxStreak, avgResponseMs

Attempt
  id, sessionId, regionId, correct, responseMs, answerRaw?

DailyChallenge (futuro)
  date, mapId, modeId, seed
```

## Stats (agregados)

```text
RegionStats
  profileId, regionId, attempts, correct, lastPlayedAt

ProfileStats
  profileId, mapId, sessionsPlayed, bestScore, bestStreak
  avgAccuracy, avgResponseMs
```

## Commerce (pós-MVP)

```text
Entitlement
  userId, type: subscription|module|school_seat
  productId, validFrom, validTo, source: stripe|iap|manual
```

## IDs de região (Brasil)

Usar siglas oficiais: `AC`, `AL`, … `SP`, `TO` — alinhadas ao `@federacao/react-brazil-map`.
