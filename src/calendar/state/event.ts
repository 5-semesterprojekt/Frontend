import { atom, selector } from 'recoil';

import { Event } from '../types/event';
import { mainApi } from '../../lib/api';
import { organizationConfig } from '../../../config/organization';

export const EventCache = atom<Event[]>({ key: 'EventCache', default: [] });

export const GetEvents = selector<Event[]>({
  key: 'GetEvents',
  get: async () => {
    try {
      const response = await mainApi.get(`/events/${organizationConfig.id}`);

      if (response.ok) {
        return response.data as Event[];
      } else {
        throw response;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      return [];
    }
  },
  set: ({ set }, value) => {
    set(EventCache, value);
  },
});
