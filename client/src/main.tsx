import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import { GlobalStyle } from './common/styles/global.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <GlobalStyle />
      <App />
    </HashRouter>
  </StrictMode>,
);
