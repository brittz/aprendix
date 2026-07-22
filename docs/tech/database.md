# Database

## MVP

Sem banco remoto. Persistência local:

- sessões, attempts, stats, settings, conquistas

Abstrair atrás de `ProgressRepository` para trocar por API depois.

## Fase 4+ — PostgreSQL (esboço)

### Tabelas principais

- `users`
- `profiles`
- `sessions`
- `attempts`
- `region_stats`
- `achievements_unlocked`
- `entitlements`
- `products`
- `organizations` (escolas)
- `org_memberships`
- `classes`
- `class_members`
- `assignments`

### Índices relevantes

- `attempts(session_id)`
- `region_stats(profile_id, region_id)` UNIQUE
- `entitlements(user_id, product_id)`
- `sessions(profile_id, started_at DESC)`

### Soft rules

- Cascata controlada ao apagar perfil (LGPD).
- `entitlements` imutáveis por append + `revoked_at` quando necessário.
- Evitar PII de crianças além do necessário (apelido > nome completo).

Schema formal (migrations) será criado com o backend.
