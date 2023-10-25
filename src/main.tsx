import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
import { Spin } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<Spin />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
