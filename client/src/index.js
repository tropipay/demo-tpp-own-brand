import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@emotion/react'
import reportWebVitals from './app/services/reportWebVitals';
import App from './app/App';
import theme from './app/services/theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <App />
);

reportWebVitals();
