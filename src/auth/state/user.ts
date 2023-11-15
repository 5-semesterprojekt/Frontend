import { atom, selector } from 'recoil';

import { User } from '../types/user';
import { organizationConfig } from '../../../config/organization';

import { mainApi } from '@/lib/api';

const CurrentUserCache = atom<User | undefined>({
  key: 'CurrentUserCache',
  default: undefined,
});

export const CurrentUser = selector<User | undefined>({
  key: 'CurrentUser',
  get: async ({ get }) => {
    const currentUser = get(CurrentUserCache);

    if (!currentUser) {
      const response = await mainApi.get(`/users/${organizationConfig.id}/me`);

      if (response.ok) {
        return response.data as User;
      } else {
        return undefined;
      }
    } else {
      return currentUser;
    }
  },
  set: ({ set }, value) => set(CurrentUserCache, value),
});
