# 11 — Map Engine

## Objetivo

Engine **genérica** de mapas regionais: qualquer mapa com regiões identificáveis (SVG/geo paths), não só o Brasil.

O Brasil é o primeiro **adapter/provider**, usando `@federacao/react-brazil-map`.

---

## Conceitos

| Conceito | Descrição |
|---|---|
| `MapDefinition` | id, nome, dificuldade, categorias, metadados |
| `Region` | id, nome(s) i18n, path/geometria, centróide, parentId opcional |
| `MapProvider` | carrega geometria + regiões para um `MapDefinition` |
| `MapSession` | estado da rodada: prompt atual, seleção, placar |
| `GameMode` | regras de input, feedback e scoring sobre a session |

---

## Adapter Brasil

```text
@federacao/react-brazil-map
        ↓
BrazilMapProvider (Aprendix)
        ↓
MapEngine (genérica)
        ↓
Game modes (Encontre, Nomeie, Treino…)
```

Responsabilidades do adapter:

- Expor `Region[]` a partir de `brazil-states.json`
- Renderizar via `<BrazilMap />` com props de seleção/accent/fillOverrides
- Traduzir eventos `onStateClick` → `MapEngine.selectRegion(id)`

A engine **não** importa tipos `Brazil*` diretamente nos modos — só `Region` / `MapView`.

---

## API mental da engine

```ts
interface Region {
  id: string;
  names: Record<string, string>; // i18n
  meta?: Record<string, unknown>;
}

interface MapDefinition {
  id: string;
  titleKey: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  categories: string[];
  providerId: string;
  regionIds: string[];
}

// Modo "encontre"
ask(regionId) → wait click → compare → feedback → next
```

---

## Extensão futura

Novos países/continentes = novo provider + dataset, mesmos modos.

Drill-down (município/bairro): a lib Brasil já prevê `SubFeature` / níveis de zoom — a engine deve modelar hierarquia `parentId` desde cedo.
