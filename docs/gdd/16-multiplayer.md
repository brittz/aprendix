# 16 — Multijogador (Geografia / mapas)

**Status:** planejado — não implementado no MVP (Fase 1).  
**Escopo:** apenas **online**. Sem hot-seat local no desenho atual.

---

## Objetivo

Permitir que vários jogadores pratiquem o **mesmo `PhaseDefinition`** (mapa + tema) em uma partida competitiva saudável: vence quem demonstra mais conhecimento do mapa, não quem clica mais rápido sem conteúdo.

---

## Modo inicial: Claim (reivindicar região)

Inspiração (estados do Brasil — vale para qualquer tema de mapa):

1. Sala online com N jogadores e uma fase (`geo-br-states`, biomas, países…).
2. Em cada turno, **um jogador** pode reivindicar **uma** região ainda livre.
3. Há **limite de tempo** por turno; ao estourar, a vez passa.
4. Regiões óbvias tendem a sair cedo; as menos conhecidas sobram para o fim.
5. Ao não restar regiões (ou ao encerrar a fila), soma-se a pontuação → **vencedor** (“mais inteligente” / quem conhece mais o mapa).

### Regras propostas

| Regra | Valor sugerido |
|---|---|
| Ação por turno | 1 claim |
| Tempo por turno | 15–30 s (configurável na sala) |
| Claim correto | região fica do jogador + pontos |
| Claim incorreto | sem posse; turno pode encerrar ou permitir retry curto (a definir) |
| Timeout | pula jogador; região permanece livre |
| Empate | compartilhar vitória ou desempate por tempo médio de resposta |

---

## Por que a engine já comporta isso

- `PhaseDefinition` + `Region[]` são compartilhados com o solo.
- Contratos em `@aprendix/game-core` (`MultiplayerRoom`, `RegionClaim`, eventos).
- Cada fase declara `multiplayerModes: ['claim']` quando elegível.
- Novos temas (biomas, capitais, mapas fictícios) reutilizam o mesmo modo claim sem reescrever rede.

---

## Arquitetura futura (alto nível)

```text
Client (Ionic)  ←WebSocket/HTTP→  Matchmaking + Room service
                                      ↓
                               authoritative MultiplayerRoom
                                      ↓
                               same PhaseDefinition content packs
```

- Servidor é fonte da verdade (anti-cheat básico de turno/prazo).
- Cliente só envia `MultiplayerTurnAction` e renderiza ownership no adapter de mapa (`fillOverrides` por jogador/cor).

---

## UX / valores do produto

- Ranking da partida por conhecimento naquele mapa — não leaderboard global tóxico infantil.
- Modo online opt-in; perfis infantis podem desabilitar.
- Sem pressure purchase no lobby.

---

## Roadmap

Ver Fase “Multijogador online” em `15-roadmap.md`.
