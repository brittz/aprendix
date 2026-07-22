# Frontend

## App

- **Ionic React** + **Vite** + **TypeScript** em `apps/web`
- **Capacitor** inicializado (`com.aprendix.app`); plataformas nativas na Fase 2
- React 18+ (peer do `@federacao/react-brazil-map`)

## Estrutura (`apps/web`)

```text
src/
  app via App.tsx       # rotas Ionic
  pages/                # Home, GeographyMap (smoke)
  theme/variables.css   # tokens --ax-* e --rbm-*
  features/             # (Fase 1) geography, map bridge
public/data/            # brazil-states.json
```

## Integração do mapa

```tsx
import { BrazilMap, useBrazilMapData } from '@federacao/react-brazil-map';
import '@federacao/react-brazil-map/styles.css';
```

- `fillOverrides` / `accentId` / `selectedId` para feedback de acerto-erro.
- `readOnly` quando o modo não usa pan/zoom livre.
- Toque: `onStateClick` → engine.

## i18n

- Chaves desde o dia 1 (`t('geo.find', { name })`).
- Locale padrão: `pt-BR`.

## Theming

- CSS variables `--ax-*` no app.
- Isolar tema do mapa via `--rbm-*` (prefixo do plugin).

## Testes

- Unit: scoring, normalização de nomes, seleção de prompt.
- Component: modo Encontre com provider fake.
- E2E smoke (Playwright) na web.
