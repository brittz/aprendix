# Arquitetura

## Objetivos

- Modular: cada jogo/módulo = dados + UI fina + reuse de engines.
- Web primeiro; mobile via Capacitor (mesmo código).
- Testável: regras de jogo puras, UI separada.
- Preparada para i18n, entitlements e B2B.

---

## Stack escolhida

| Camada | Tecnologia | Motivo |
|---|---|---|
| App | **Ionic React + Vite** | Preferência do time + UI mobile-ready |
| Nativo | **Capacitor** | Android / iOS a partir do web |
| Mapa BR | **@federacao/react-brazil-map** | Já existe, React, SVG interativo |
| Linguagem | TypeScript | Contratos da engine e segurança de tipos |
| Estado local MVP | IndexedDB / localStorage (via camada repo) | Sem backend no MVP |
| Backend (fase 4+) | API Node (a definir) | Auth, sync, billing, escolas |

**Por que não Flutter/outro?** O mapa é React; Ionic React evita rewrite e alinha com experiência Ionic existente.

---

## Monorepo (atual)

```text
aprendix/
├── apps/
│   └── web/                      # Ionic React + Capacitor
├── packages/
│   ├── react-brazil-map/         # SVG Brasil (provider)
│   ├── map-engine/               # Region, PhaseDefinition, helpers
│   ├── game-core/                # Solo modes, score, progress, MP contracts
│   └── content-geography/        # Fases (BR states free, …)
├── docs/
└── .github/workflows/ci.yml
```

### Fases (content packs)

Uma **fase** = mapa (provider + geometria) + tema de aprendizado (`quizAttribute`) + modos liberados.

Exemplos futuros na mesma engine: biomas, capitais, geração de energia, países, mapas fictícios — só novos dados em `content-*`.

### Multijogador

Contratos em `game-core` (`MultiplayerRoom`, modo `claim`). Implementação online na Fase 6 — ver `docs/gdd/16-multiplayer.md`.


---

## Camadas lógicas

```text
┌─────────────────────────────────────────┐
│  UI (Ionic pages / components)          │
├─────────────────────────────────────────┤
│  Game modes (find, name, train…)        │
├─────────────────────────────────────────┤
│  game-core (session, score, stats)      │
├─────────────────────────────────────────┤
│  map-engine (MapDefinition, Region…)    │
├─────────────────────────────────────────┤
│  providers (BrazilMapProvider, …)       │
├─────────────────────────────────────────┤
│  persistence / api / entitlements       │
└─────────────────────────────────────────┘
```

## Regra de ouro

Novo mapa ou modo **não** reescreve o core: adiciona content pack + config (+ provider se geometria nova).

## Relação com o plugin

Dependência no monorepo:

```json
"@federacao/react-brazil-map": "file:../../packages/react-brazil-map"
```

Origem do plugin: `E:/Desenvolvimento/Projetos/plugins/react-brazil-map` (vendorizado em `packages/` para CI).
