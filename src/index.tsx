import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />

      {process.env.NODE_ENV === 'development' && (
        <>
          <TanStackDevtools
            config={{ hideUntilHover: true }}
            plugins={[formDevtoolsPlugin()]}
          />
        </>
      )}
    </React.StrictMode>
  );
}
