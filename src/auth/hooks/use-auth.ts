import { useRecoilState } from 'recoil';

import { deleteAccessToken, setAccessToken } from '../service/tokens';
import { organizationConfig } from '../../../config/organization';
import { mainApi } from '../../lib/api';
import { User } from '../types/user';
import { CurrentUser } from '../state/user';

export function useAuth() {
  const [user, setUser] = useRecoilState<User | undefined>(CurrentUser);

  const signInUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await mainApi.post(
      `/users/${organizationConfig.id}/login`,
      credentials,
    );

    if (response.ok) {
      const { token, user } = response.data as { token: string; user: User };
      setUser(user);
      setAccessToken(token);
    }
  };

  const registerUser = async (newUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await mainApi.post(
      `/users/${organizationConfig.id}`,
      newUser,
    );

    if (response.ok) {
      const { token, user } = response.data as { token: string; user: User };
      setUser(user);
      setAccessToken(token);
    }
  };

  const signOutUser = () => {
    deleteAccessToken();
    setUser(undefined);
  };

  return {
    user,
    signInUser,
    signOutUser,
    registerUser,
  };
}
