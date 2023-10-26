import { render, waitFor } from '@testing-library/react';
import { events } from './Event.fixtures';
import EventInList from '../components/EventInList';

test('it can render an event', async () => {
  const event = events[0];

  const container = render(<EventInList event={event} />);

  await waitFor(() => {
    expect(container.getByText(event.title)).toBeDefined();
    if (event.description && event.description.length > 0) {
      expect(container.getByText(event.description)).toBeDefined();
    }
    expect(
      container.getByText(
        new RegExp(new Date(event.start).getFullYear().toString()),
      ),
    ).toBeDefined();
  });
});
