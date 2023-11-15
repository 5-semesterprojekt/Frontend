import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { deleteAccessToken, setAccessToken } from '../service/tokens';
import { organizationConfig } from '../../../config/organization';
import { mainApi } from '../../lib/api';
import { User } from '../types/user';
import { CurrentUser } from '../state/user';

export function useAuth() {
  const [user, setUser] = useRecoilState<User | undefined>(CurrentUser);
  const refreshUser = useRecoilRefresher_UNSTABLE(CurrentUser);
  const navigate = useNavigate();

  const signInUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await mainApi.post(
      `/users/${organizationConfig.id}/login`,
      credentials,
    );

    if (response.ok) {
      const { user } = response.data as { user: User };
      setUser(user);
      if (user.token) setAccessToken(user.token);
      navigate('/');
    } else {
      throw response;
    }
  };

  const updateAccount = async (updatedUser: User) => {
    const response = await mainApi.put(
      `/users/${organizationConfig.id}/${user?.id}`,
      updatedUser,
    );

    if (response.ok) {
      const { user } = response.data as { user: User };
      setUser(user);
      if (user.token) setAccessToken(user.token);
    } else {
      throw response;
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
      const { user } = response.data as { user: User };
      setUser(user);
      if (user.token) setAccessToken(user.token);
      navigate('/');
    } else {
      throw response;
    }
  };

  const signOutUser = () => {
    deleteAccessToken();
    setUser(undefined);
    refreshUser();
    navigate('/');
  };

  const deleteAccount = async () => {
    const response = await mainApi.delete(
      `/users/${organizationConfig.id}/${user?.id}`,
    );

    if (response.ok) {
      signOutUser();
    } else {
      throw response;
    }
  };

  return {
    user,
    signInUser,
    signOutUser,
    registerUser,
    updateAccount,
    deleteAccount,
  };
}
