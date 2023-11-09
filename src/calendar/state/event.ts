import { atom, selector } from 'recoil';

import { Event } from '../types/event';
import { mainApi } from '../../lib/api';
import { organizationConfig } from '../../../config/organization';

export const EventCache = atom<Event[]>({
  key: 'EventCache',
  default: [],
});

export const GetEvents = selector<Event[]>({
  key: 'GetEvents',
  get: async () => {
    const response = await mainApi.get(`/events/${organizationConfig.id}`);

    if (response.ok) {
      const events = response.data as Event[];

      events.forEach((event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
      });

      return events as Event[];
    } else {
      throw response;
    }
  },
  set: ({ set }, value) => {
    set(EventCache, value);
  },
});
