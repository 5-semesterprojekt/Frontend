import { selector } from 'recoil';
import { Event } from '../types/event';

export const GetEvents = selector<Event[]>({
  key: 'GetEvents',
  get: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + '/events/123',
      );
      const events = await response.json();

      return events as Event[];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
});
