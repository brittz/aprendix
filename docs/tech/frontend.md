# Frontend

## App

- **Ionic React** + **Vite** + **TypeScript**
- **Capacitor** para Android/iOS
- React 18+ (peer do `@federacao/react-brazil-map`)

## Estrutura sugerida (`apps/web`)

```text
src/
  app/                 # rotas, providers
  pages/               # Home, Geography, Session, Results, Stats
  features/
    geography/         # UI do módulo
    map/               # bridge para map-engine + BrazilMap
  shared/              # UI kit, i18n, theme
  persistence/         # repos locais
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
