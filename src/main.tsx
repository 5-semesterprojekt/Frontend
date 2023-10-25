import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
import { Spin } from 'antd';
import NiceModal from '@ebay/nice-modal-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <NiceModal.Provider>
        <Suspense fallback={<Spin />}>
          <App />
        </Suspense>
      </NiceModal.Provider>
    </RecoilRoot>
  </React.StrictMode>,
);
