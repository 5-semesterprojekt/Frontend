import { screen, render, waitFor } from '@testing-library/react';
import nock from 'nock';
import { beforeEach, test, expect } from 'vitest';

import { organizationConfig } from '../../config/organization';

import AccountPage from './AccountPage';
import { User } from './types/user';
import { setAccessToken } from './service/tokens';

import AllProviders from '@/components/AllProviders';
import { getById } from '@/lib/testing/getById';

const user: User = {
  firstName: 'Martin',
  lastName: 'Jensen',
  email: 'martin@test.dk',
  id: 'testId',
  orgId: [organizationConfig.id],
};

nock(import.meta.env.VITE_BACKEND_URL as string)
  .persist()
  .get(`/users/${organizationConfig.id}/me`)
  .reply(200, user);

beforeEach(async () => {
  setAccessToken('testing-token');

  render(
    <AllProviders>
      <AccountPage />
    </AllProviders>,
  );
});

test('it can render', async () => {
  await waitFor(() => screen.getByTestId('Konto'));
});

test('it can fill the input fields with names', async () => {
  await waitFor(() => {
    expect((getById('firstName') as HTMLInputElement)?.value).toBe(
      user.firstName,
    );
    expect((getById('lastName') as HTMLInputElement)?.value).toBe(
      user.lastName,
    );
  });
});
