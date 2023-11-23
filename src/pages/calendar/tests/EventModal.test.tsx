import { act, screen, render, waitFor } from '@testing-library/react';
import NiceModal from '@ebay/nice-modal-react';
import { beforeAll, beforeEach, test, expect } from 'vitest';

import showEventModal from '../components/Event.modal';

beforeAll(() => {
  beforeEach(() => {
    render(<NiceModal.Provider />);
  });
});

test('it can render the modal', async () => {
  act(() => {
    showEventModal({
      event: {
        title: 'Ny begivenhed',
        start: new Date(),
        end: new Date(),
      },
    });
  });

  await waitFor(() => {
    expect(screen.getByText('Ny begivenhed')).toBeDefined();
  });
});
