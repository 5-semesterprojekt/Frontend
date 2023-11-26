import { act, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';

import RegisterPage from '../RegisterPage';

import renderElement from '@/lib/testing/renderElement';

beforeEach(async () => {
  await act(async () => {
    renderElement(<RegisterPage />);
  });
});

test('it can render the page', async () => {
  await waitFor(() => expect(screen.getByTestId('Opret bruger')).toBeDefined());
});
