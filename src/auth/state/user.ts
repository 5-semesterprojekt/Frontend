import { atom } from 'recoil';
import { User } from '../types/user';

export const CurrentUser = atom<User | undefined>({
  key: 'CurrentUser',
  default: undefined,
});
