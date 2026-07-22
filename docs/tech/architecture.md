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

## Relação com o plugin

O mapa **não depende** do path local `plugins/react-brazil-map` no CI.

No monorepo Aprendix a geometria/código vive em:

```text
packages/react-brazil-map/   ← vendorizado no Git (deploy Vercel OK)
```

Consumo no app:

1. **Runtime/bundle (Vite):** alias → `packages/react-brazil-map/src`
2. **Typecheck (`tsc`):** tipos ambient em `apps/web/src/types/react-brazil-map.d.ts`  
   (evita o `tsc` entrar nos `.tsx` do pacote e procurar `react` fora de `apps/web/node_modules`)

Origem de desenvolvimento do plugin (fora do repo):  
`E:/Desenvolvimento/Projetos/plugins/react-brazil-map` — sincronizar para `packages/` quando evoluir.
