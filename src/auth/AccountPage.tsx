import { useRecoilValue } from 'recoil';

import { CurrentUser } from './state/user';

import Page from '@/components/Page';

export default function AccountPage () {
  const user = useRecoilValue(CurrentUser);

  return <Page title="Konto">{user?.firstName}</Page>;
}
