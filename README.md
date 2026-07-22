# Aprendix

Plataforma de **desenvolvimento cognitivo** — módulos educativos que compartilham a mesma infraestrutura, com progresso medido contra você mesmo.

> Não é um app de anúncios com minigames. É um investimento calmo em aprendizado.

---

## Estado atual

**Fase 0 — Fundação:** visão, Game Design Document, docs técnicas e repositório Git.

Próximo passo de código: scaffold **Ionic React + Capacitor** e MVP do **Motor de Geografia** (estados do Brasil) com `@federacao/react-brazil-map`.

---

## Documentação

| Área | Caminho |
|---|---|
| Visão | [`docs/vision/vision.md`](docs/vision/vision.md) |
| Game Design | [`docs/gdd/`](docs/gdd/) |
| Roadmap | [`docs/gdd/15-roadmap.md`](docs/gdd/15-roadmap.md) |
| Arquitetura | [`docs/tech/architecture.md`](docs/tech/architecture.md) |

### GDD

1. [Overview](docs/gdd/01-overview.md)
2. [Game loop](docs/gdd/02-game-loop.md)
3. [Público-alvo](docs/gdd/03-target-audience.md)
4. [Modos de jogo](docs/gdd/04-game-modes.md)
5. [Progressão](docs/gdd/05-progression.md)
6. [Economia / monetização](docs/gdd/06-economy.md)
7. [UI/UX](docs/gdd/07-ui-ux.md)
8. [Acessibilidade](docs/gdd/08-accessibility.md)
9. [Áudio](docs/gdd/09-audio.md)
10. [Conteúdo](docs/gdd/10-content.md)
11. [Map engine](docs/gdd/11-map-engine.md)
12. [Data model](docs/gdd/12-data-model.md)
13. [Achievements](docs/gdd/13-achievements.md)
14. [Analytics](docs/gdd/14-analytics.md)
15. [Roadmap](docs/gdd/15-roadmap.md)

---

## Stack

| | |
|---|---|
| App | Ionic React + Vite + TypeScript |
| Mobile | Capacitor (Android / iOS) |
| Mapa (BR) | `@federacao/react-brazil-map` (local: `E:/Desenvolvimento/Projetos/plugins/react-brazil-map`) |
| MVP data | Persistência local |

Justificativa: o componente de mapa é React; Ionic + Capacitor permite web agora e híbrido depois, alinhado à experiência com Ionic.

---

## Monetização (resumo)

1. **Free** — amostra real (ex.: estados do Brasil)
2. **Assinatura** — R$ 14,90/mês ou R$ 99,90/ano
3. **Módulos** — compra única (Geografia, Matemática…)
4. **Escolas** — licenças + painel + relatórios *(prioridade estratégica)*
5. **Empresas** — treinamento
6. **Coleções** — conteúdo oficial futuro

**Não haverá:** anúncios, energia, loot boxes, compras agressivas para crianças.

Detalhes: [`docs/gdd/06-economy.md`](docs/gdd/06-economy.md).

---

## Estrutura do repositório

```text
aprendix/
├── apps/          # aplicações (web Ionic — em breve)
├── packages/      # engines e content packs (em breve)
├── docs/
│   ├── vision/
│   ├── gdd/
│   └── tech/
└── README.md
```

---

## Princípios

- Aprender divertido; sessões curtas; UI limpa
- Competir contra a própria evolução
- Engine educacional reutilizável — cada módulo aumenta o valor da plataforma

---

## Licença

A definir.
