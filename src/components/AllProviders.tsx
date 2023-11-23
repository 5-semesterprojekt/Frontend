import NiceModal from '@ebay/nice-modal-react';
import { ConfigProvider } from 'antd';
import daDK from 'antd/locale/da_DK';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { organizationConfig } from '../../config/organization';

import 'dayjs/locale/da';
dayjs.locale('da');

interface AllProvidersProps {
  children?: React.ReactNode;
}

const Router = import.meta.env.MODE === 'test' ? MemoryRouter : BrowserRouter;

const AllProviders = (props: AllProvidersProps) => (
  <Router>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: organizationConfig.primaryColor,
          fontFamily: 'Arvo',
        },
        components: {
          Result: {
            titleFontSize: 16,
          },
        },
      }}
      locale={daDK}
    >
      <RecoilRoot>
        <NiceModal.Provider>
          <Suspense>{props.children}</Suspense>
        </NiceModal.Provider>
      </RecoilRoot>
    </ConfigProvider>
  </Router>
);

export default AllProviders;
