import NiceModal from '@ebay/nice-modal-react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = (props: AllProvidersProps) => (
  <BrowserRouter>
    <RecoilRoot>
      <NiceModal.Provider>{props.children}</NiceModal.Provider>
    </RecoilRoot>
  </BrowserRouter>
);

export default AllProviders;
