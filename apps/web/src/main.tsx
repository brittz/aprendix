import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { installZoomLock } from './utils/blockZoom';

installZoomLock();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
