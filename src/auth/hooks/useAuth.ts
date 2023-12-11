import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { deleteAccessToken, setAccessToken } from '../service/tokens';
import { organizationConfig } from '../../../config/organization';
import { mainApi } from '../../lib/api';
import { User, UserUpdate } from '../types/user';
import { CurrentUser } from '../state/user';
import { AuthorizationError } from '../types/authorization-error';

export function useAuth(
  condition?: ((user: User | undefined) => void) | boolean,
) {
  const [user, setUser] = useRecoilState<User | undefined>(CurrentUser);
  const refreshUser = useRecoilRefresher_UNSTABLE(CurrentUser);
  const navigate = useNavigate();

  if (condition) {
    if (typeof condition === 'function') {
      condition(user);
    }
    if (!user) {
      throw new AuthorizationError('Login is required');
    }
  }

  const signInUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await mainApi.post(
      `/users/${organizationConfig.id}/login`,
      credentials,
    );

    if (response.ok) {
      const user = response.data as User;
      setUser(user);
      if (user.token) setAccessToken(user.token);
      navigate('/');
    } else {
      throw response;
    }
  };

  const updateAccount = async (updatedUser: UserUpdate) => {
    const response = await mainApi.put(
      `/users/${organizationConfig.id}/${user?.id}`,
      updatedUser,
    );

    if (response.ok) {
      const user = response.data as User;
      setUser(user);
    } else {
      throw response;
    }
  };

  const forgotPassword = async (forgottenUser: { email: string }) => {
    const response = await mainApi.post(
      `/users/${organizationConfig.id}/forgot-password`,
      forgottenUser,
    );

    if (!response.ok) {
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
      const user = response.data as User;
      setUser(user);
      if (user.token) setAccessToken(user.token);
      navigate('/');
    } else {
      throw response;
    }
  };

  const signOutUser = (fallbackUrl?: string) => {
    deleteAccessToken();
    setUser(undefined);
    refreshUser();
    navigate(fallbackUrl || '/');
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
    forgotPassword,
    registerUser,
    updateAccount,
    deleteAccount,
  };
}
