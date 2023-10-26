import { atom, selector } from 'recoil';
import { Event } from '../types/event';
import { mainApi } from '../../lib/api';

export const EventCache = atom<Event[]>({ key: 'EventCache', default: [] });

export const GetEvents = selector<Event[]>({
  key: 'GetEvents',
  get: async () => {
    try {
      const response = await mainApi.get(
        `/events/${import.meta.env.VITE_ORGANIZATION_ID}`,
      );

      if (response.ok) {
        return response.data as Event[];
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  set: ({ set }, value) => {
    set(EventCache, value);
  },
});
