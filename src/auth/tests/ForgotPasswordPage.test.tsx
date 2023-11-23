import { act, screen, waitFor } from '@testing-library/react';
import { beforeEach, test } from 'vitest';

import ForgotPasswordPage from '../ForgotPasswordPage';

import renderElement from '@/lib/testing/renderElement';

beforeEach(async () => {
  await act(async () => {
    renderElement(<ForgotPasswordPage />);
  });
});

test('it can render the page', async () => {
  await waitFor(() => screen.getByTestId('Glemt adgangskode'));
});