import { act, screen, waitFor } from '@testing-library/react';
import { beforeEach, test, expect } from 'vitest';

import AccountPage from '../AccountPage';

import { getById } from '@/lib/testing/getById';
import renderElement from '@/lib/testing/renderElement';
import { testUser } from '@/SetupTests';

beforeEach(async () => {
  await act(async () => {
    renderElement(<AccountPage />);
  });
});

test('it can render the page', async () => {
  await waitFor(() => screen.getByTestId('Konto'));
});

test('it can fill the input fields with the users information', async () => {
  await waitFor(() => {
    expect((getById('firstName') as HTMLInputElement)?.value).toBe(
      testUser.firstName,
    );
    expect((getById('lastName') as HTMLInputElement)?.value).toBe(
      testUser.lastName,
    );
  });
});
