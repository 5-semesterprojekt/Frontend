import { render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { expect, test } from 'vitest';

import EventList from '../components/EventList';

import { eventsAtom } from './Event.fixtures';

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
