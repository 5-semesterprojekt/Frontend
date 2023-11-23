import { act, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';

import LoginPage from '../LoginPage';

import renderElement from '@/lib/testing/renderElement';

beforeEach(async () => {
  await act(async () => {
    renderElement(<LoginPage />);
  });
});

test('it can render the page', async () => {
  await waitFor(() => expect(screen.getByTestId('Log ind')).toBeDefined());
});
