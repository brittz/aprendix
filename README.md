# Aprendix

Plataforma de **desenvolvimento cognitivo** — módulos educativos que compartilham a mesma infraestrutura, com progresso medido contra você mesmo.

> Não é um app de anúncios com minigames. É um investimento calmo em aprendizado.

---

## Estado atual

**Fase 1 — MVP Geografia** concluída: engine genérica, 3 modos, progresso local, evolução, i18n PT-BR, 27 estados free.

Próximo: **Fase 2** (a11y, áudio, Capacitor nativo, testes, stats por região).

---

## Desenvolvimento

```bash
npm run dev
```

Fluxo: Home → Geografia → Estados do Brasil → Treino / Encontre / Nomeie.

---

## Documentação

| Área | Caminho |
|---|---|
| Visão | [`docs/vision/vision.md`](docs/vision/vision.md) |
| Game Design | [`docs/gdd/`](docs/gdd/) |
| Roadmap | [`docs/gdd/15-roadmap.md`](docs/gdd/15-roadmap.md) |
| Arquitetura | [`docs/tech/architecture.md`](docs/tech/architecture.md) |

---

## Stack

| | |
|---|---|
| App | Ionic React + Vite + TypeScript (`apps/web`) |
| Mobile | Capacitor (Android / iOS na Fase 2) |
| Mapa (BR) | `@federacao/react-brazil-map` em `packages/react-brazil-map` |
| MVP data | Persistência local (Fase 1) |

---

## Estrutura

```text
aprendix/
├── apps/web/                      # Ionic React + Capacitor
├── packages/
│   ├── react-brazil-map/          # Provider SVG Brasil
│   ├── map-engine/                # Contratos de mapa/fase
│   ├── game-core/                 # Modos solo + progresso + MP types
│   └── content-geography/         # Fases (BR states, …)
├── docs/
│   ├── vision/
│   ├── gdd/                       # incl. 16-multiplayer.md
│   └── tech/
└── .github/workflows/ci.yml
```

O pacote de mapa foi vendorizado a partir de `plugins/react-brazil-map` para o repositório ser autocontido no CI. A origem externa continua sendo a referência de desenvolvimento do plugin.

---

## Monetização (resumo)

1. **Free** — amostra real (ex.: estados do Brasil)
2. **Assinatura** — R$ 14,90/mês ou R$ 99,90/ano
3. **Módulos** — compra única
4. **Escolas** — licenças + painel *(prioridade estratégica)*
5. **Empresas** / **Coleções** — futuro

**Não haverá:** anúncios, energia, loot boxes, compras agressivas para crianças.

---

## Licença

A definir.
