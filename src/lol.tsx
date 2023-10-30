import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Spin } from 'antd';
import AllProviders from './components/AllProviders.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AllProviders>
      <Suspense fallback={<Spin />}>
        <App />
      </Suspense>
    </AllProviders>
  </React.StrictMode>,
);
