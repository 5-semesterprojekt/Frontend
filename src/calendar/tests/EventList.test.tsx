import { render, waitFor } from '@testing-library/react';
import { events } from './Event.fixtures';
import EventList from '../components/EventList';

test('it can render the list', async () => {
  const container = render(<EventList events={events} />);

  await waitFor(() => {
    expect(container.getAllByTestId('event').length).toBe(3);
  });
});
