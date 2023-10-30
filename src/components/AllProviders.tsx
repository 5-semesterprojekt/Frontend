import NiceModal from '@ebay/nice-modal-react';
import { RecoilRoot } from 'recoil';

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = (props: AllProvidersProps) => (
  <RecoilRoot>
    <NiceModal.Provider>{props.children}</NiceModal.Provider>
  </RecoilRoot>
);

export default AllProviders;
