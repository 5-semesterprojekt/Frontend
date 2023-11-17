import { render, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

import EventInList from '../components/EventInList';

import { events } from './Event.fixtures';

test('it can render an event', async () => {
  const event = events[0];

  const container = render(<EventInList event={event} />);

  await waitFor(() => {
    expect(container.getByText(event.title)).toBeDefined();
    if (event.description && event.description.length > 0) {
      expect(container.getByText(event.description)).toBeDefined();
    }
    expect(
      container.getAllByText(new RegExp(event.start.getFullYear().toString())),
    ).toBeDefined();
  });
});
