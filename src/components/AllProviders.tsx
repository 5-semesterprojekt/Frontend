import NiceModal from '@ebay/nice-modal-react';
import { ConfigProvider } from 'antd';
import daDK from 'antd/locale/da_DK';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import dayjs from 'dayjs';

import { organizationConfig } from '../../config/organization';

import 'dayjs/locale/da';
dayjs.locale('da');

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = (props: AllProvidersProps) => (
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: organizationConfig.primaryColor,
          fontFamily: 'Arvo',
        },
      }}
      locale={daDK}
    >
      <RecoilRoot>
        <NiceModal.Provider>{props.children}</NiceModal.Provider>
      </RecoilRoot>
    </ConfigProvider>
  </BrowserRouter>
);

export default AllProviders;
