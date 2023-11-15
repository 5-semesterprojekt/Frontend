import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import AllProviders from './components/AllProviders.tsx';
import FullPageSpin from './components/FullPageSpin.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AllProviders>
      <Suspense fallback={<FullPageSpin />}>
        <App />
      </Suspense>
    </AllProviders>
  </React.StrictMode>,
);
