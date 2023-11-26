import { atom, selector } from 'recoil';

import { User } from '../types/user';
import { organizationConfig } from '../../../config/organization';
import { getAccessToken } from '../service/tokens';

import { mainApi } from '@/lib/api';

const CurrentUserCache = atom<User | undefined>({
  key: 'CurrentUserCache',
  default: undefined,
});

export const CurrentUser = selector<User | undefined>({
  key: 'CurrentUser',
  get: async ({ get }) => {
    let currentUser: User | undefined = get(CurrentUserCache);

    if (!currentUser && getAccessToken()) {
      const response = await mainApi.get(`/users/${organizationConfig.id}/me`);

      if (response.ok) {
        currentUser = response.data as User;
      }
    }

    return currentUser;
  },
  set: ({ set }, value) => set(CurrentUserCache, value),
});
