import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Spin } from 'antd';

import App from './App.tsx';
import AllProviders from './components/AllProviders.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AllProviders>
      <Suspense fallback={<Spin />}>
        <App />
      </Suspense>
    </AllProviders>
  </React.StrictMode>,
);
