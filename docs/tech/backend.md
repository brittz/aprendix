# Backend

## MVP (Fase 1–2)

Sem backend obrigatório.

- Progresso e stats em armazenamento local.
- Conteúdo estático no app / packages.

## Fase 4+ — API

Responsabilidades:

- Autenticação (e-mail mágico / OAuth)
- Sync de perfis e progresso
- Entitlements (assinatura, módulos)
- Webhooks de pagamento
- (Fase 5) tenant escolar, turmas, relatórios

## Estilo de API

- REST ou RPC tipado (OpenAPI).
- Auth Bearer JWT / session.
- Multi-tenant para escolas (`orgId`).

## Serviços sugeridos (não fechados)

| Concern | Opção típica |
|---|---|
| Auth | Own + provedor (Clerk/Auth.js/etc.) |
| DB | PostgreSQL |
| Billing B2C | Stripe (+ IAP nas stores) |
| Billing B2B | Stripe invoices / contrato |
| Files | Object storage se houver exports |

## Princípios

- LGPD: minimização, base legal, exclusão de conta.
- Servidor é fonte da verdade para compras; cliente só cacheia entitlements.
- Nunca confiar no cliente para liberar conteúdo pago sem verificação.

Detalhes de schema: `database.md`. Contrato: `api.md`.
