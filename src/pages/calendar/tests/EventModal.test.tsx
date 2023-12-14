import { act, screen, waitFor } from '@testing-library/react';
import { beforeEach, test, expect } from 'vitest';

import showEventModal from '../components/Event.modal';

import renderElement from '@/lib/testing/renderElement';

beforeEach(() => {
  renderElement(<></>);
});

test('it can render the add event modal', async () => {
  act(() => {
    showEventModal({
      event: {
        title: '',
        start: new Date(),
        end: new Date(),
      },
    });
  });

  await waitFor(() => {
    expect(screen.getByText('Ny begivenhed')).toBeDefined();
  });
});

test('it can render the edit event modal', async () => {
  act(() => {
    showEventModal({
      event: {
        title: '',
        start: new Date(),
        end: new Date(),
      },
      newEvent: false,
    });
  });

  await waitFor(() => {
    expect(screen.getByText('Ændr begivenhed')).toBeDefined();
  });
});
