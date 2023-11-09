import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { deleteAccessToken, setAccessToken } from '../service/tokens';
import { organizationConfig } from '../../../config/organization';
import { mainApi } from '../../lib/api';
import { User } from '../types/user';
import { CurrentUser } from '../state/user';
import { notify } from '../../services/NotificationService';

export function useAuth() {
  const [user, setUser] = useRecoilState<User | undefined>(CurrentUser);
  const navigate = useNavigate();

  const meRequest = async () => {
    const response = await mainApi.get(`/users/${organizationConfig.id}/me`);

    if (response.ok) {
      const { token, user } = response.data as { token: string; user: User };
      setUser(user);
      setAccessToken(token);
    }
  };

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
      notify('success', 'Logget ind');
      navigate('/');
    } else {
      if (response.problem === 'NETWORK_ERROR') {
        notify(
          'error',
          'Kunne ikke logge ind',
          'Der kunne ikke skabes forbindelse til serveren.',
        );
      } else {
        notify(
          'error',
          'Kunne ikke logge ind',
          'Tjek om dine loginoplysninger er skrevet korrekt.',
        );
      }
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
      notify('success', 'Registreret!');
      navigate('/');
    } else {
      if (response.problem === 'NETWORK_ERROR') {
        notify(
          'error',
          'Kunne ikke logge ind',
          'Der kunne ikke skabes forbindelse til serveren.',
        );
      } else {
        notify(
          'error',
          'Kunne ikke registreres',
          'Denne e-mail er allerede i brug.',
        );
      }
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
    meRequest,
  };
}
