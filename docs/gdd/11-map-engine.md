# 11 — Map Engine

## Objetivo

Engine **genérica** de mapas regionais: qualquer mapa com regiões identificáveis (SVG/geo paths), não só o Brasil.

O Brasil é o primeiro **adapter/provider**, usando `@federacao/react-brazil-map`.

---

## Conceitos

| Conceito | Descrição |
|---|---|
| `Region` | Entidade lógica (UF, país, bioma, província fictícia…) |
| `PhaseDefinition` | **Fase jogável**: geometria + tema (`quizAttribute`) + modos |
| `MapProviderId` | Quem carrega/renderiza a geometria (`brazil-svg`, futuro `world-geojson`…) |
| `SessionSnapshot` | Estado da partida solo (`@aprendix/game-core`) |

### Fases = configuração, não código novo

Exemplos de fases futuras no mesmo motor:

- Estados brasileiros (nome) — MVP free
- Capitais dos estados (`quizAttribute: 'capital'`)
- Biomas
- Geração de energia por UF
- Países do mundo
- Mapas fictícios

Cada uma é um `PhaseDefinition` em `packages/content-geography` (ou content pack dedicado).

---

## Adapter Brasil

```text
@federacao/react-brazil-map
        ↓
BrazilPhaseMap (apps/web adapter)
        ↓
PhaseDefinition + game-core modes
```

A engine **não** importa tipos `Brazil*` nos modos — só `Region` / `PhaseDefinition`.

---

## Multijogador

Mesmas fases; contratos em `game-core` / `docs/gdd/16-multiplayer.md`. Online only; modo Claim planejado.
