import { render, waitFor } from '@testing-library/react';
import { eventsAtom } from './Event.fixtures';
import EventList from '../components/EventList';
import { RecoilRoot } from 'recoil';

test('it can render the list', async () => {
  const container = render(
    <RecoilRoot>
      <EventList recoilSource={eventsAtom} />
    </RecoilRoot>,
  );

  await waitFor(() => {
    expect(container.getAllByTestId('event').length).toBe(3);
  });
});
