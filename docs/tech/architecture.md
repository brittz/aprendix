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

## Monorepo (alvo)

```text
aprendix/
├── apps/
│   └── web/                 # Ionic React + Capacitor
├── packages/
│   ├── map-engine/          # Engine genérica de mapas
│   ├── game-core/           # Sessão, scoring, progresso
│   ├── content-br-states/   # Dataset + provider Brasil
│   └── ui/                  # Componentes compartilhados (opcional)
├── docs/
└── README.md
```

No bootstrap inicial, `apps/web` pode concentrar código até extrair packages.

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

Dependência local:

```json
"@federacao/react-brazil-map": "file:../../../plugins/react-brazil-map"
```

(Ajuste o caminho relativo conforme a pasta final do app.)
