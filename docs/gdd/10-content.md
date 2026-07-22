# 10 — Conteúdo

## Princípio

Conteúdo = dados versionados. A engine não embute nomes de estados hardcoded na lógica de regras.

---

## MVP — Brasil (estados)

- 27 UFs
- Geometria: `@federacao/react-brazil-map` (`brazil-states.json`)
- Metadados: id (sigla), nome oficial, região (N/NE/CO/SE/S), capital (para modo futuro)

## Expansão — mapas

Ordem sugerida:

1. Brasil — estados (MVP)
2. América do Sul — países
3. Continentes / Mundo — países
4. Brasil — capitais (modo)
5. Biomas, rios, relevo
6. Municípios / bairros (drill-down avançado)

## Pacotes de conteúdo

Cada pacote declara:

- `contentId`, `version`
- `licenseTier`: `free` | `module:geography` | `subscription` | `school`
- `maps[]`, `modesEnabled[]`
- `locale` dos nomes

## Autoria e qualidade

- Nomes oficiais; fontes citadas na documentação interna.
- Revisão ortográfica PT-BR; preparação para EN/ES.
- Sem conteúdo pago disfarçado dentro do free além do combinado na economia.
