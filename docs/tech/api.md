# API

Contrato alvo (Fase 4+). MVP não exige estes endpoints.

## Auth

| Método | Path | Descrição |
|---|---|---|
| POST | `/auth/login` | Início de sessão |
| POST | `/auth/logout` | Encerrar |
| GET | `/me` | Usuário + entitlements |

## Profiles & progress

| Método | Path | Descrição |
|---|---|---|
| GET/POST | `/profiles` | Listar / criar |
| PATCH | `/profiles/:id` | Atualizar |
| POST | `/sessions` | Enviar sessão concluída |
| GET | `/stats/:profileId` | Agregados |
| GET | `/stats/:profileId/regions` | Erros por região |

## Commerce

| Método | Path | Descrição |
|---|---|---|
| GET | `/entitlements` | O que o usuário pode jogar |
| POST | `/billing/checkout` | Stripe checkout |
| POST | `/billing/webhook` | Webhooks |

## Schools (Fase 5)

| Método | Path | Descrição |
|---|---|---|
| GET | `/orgs/:orgId/classes` | Turmas |
| GET | `/orgs/:orgId/classes/:id/progress` | Progresso |
| POST | `/orgs/:orgId/assignments` | Atividades |
| GET | `/orgs/:orgId/reports/export` | Relatórios |

## Erros

Formato JSON consistente: `{ code, message, details? }` com HTTP adequados (401/403/404/422).

## Versionamento

Prefixo `/v1`. Breaking changes → `/v2`.
