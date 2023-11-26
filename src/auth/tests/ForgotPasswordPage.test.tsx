import { act, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import ForgotPasswordPage from '../ForgotPasswordPage';

import renderElement from '@/lib/testing/renderElement';

test('it can render the page, when no token is given in url search params', async () => {
  await act(async () => {
    renderElement(<ForgotPasswordPage />);
  });

  await waitFor(() => {
    expect(screen.getByTestId('Glemt adgangskode')).toBeDefined();
    expect(screen.getByText('Glemt adgangskode')).toBeDefined();
  });
});

test('it can render the "new password" page, when a token is given in url search params', async () => {
  const router = await import('react-router-dom');
  router.useSearchParams = vi
    .fn()
    .mockReturnValue([new URLSearchParams({ token: 'token' })]);

  await act(async () => {
    renderElement(<ForgotPasswordPage />);
  });

  await waitFor(() => {
    expect(screen.getByTestId('Glemt adgangskode')).toBeDefined();
    expect(screen.getByText('Ny adgangskode')).toBeDefined();
  });

  vi.clearAllMocks();
});
