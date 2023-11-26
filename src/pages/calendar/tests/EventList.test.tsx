import { waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

import EventList from '../components/EventList';

import { eventsAtom } from './Event.fixtures';

import renderElement from '@/lib/testing/renderElement';

test('it can render the list', async () => {
  const container = renderElement(<EventList recoilSource={eventsAtom} />);

  await waitFor(() => {
    expect(container.getAllByTestId('event').length).toBe(3);
  });
});
