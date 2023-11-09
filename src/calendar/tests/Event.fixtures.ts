import { atom } from 'recoil';
import dayjs from 'dayjs';

import { Event } from '../types/event';

const events: Event[] = [
  {
    id: '0',
    title: 'Brætspilsaften',
    description:
      'I aften står den på hygge med brætspil, kaffe og kage. Kom glad og tag gerne nogle af dine brætspil med!',
    start: dayjs().add(2, 'hour').toDate(),
    end: dayjs().add(3, 'hour').toDate(),
  },
  {
    id: '1',
    title: 'Undervisning',
    description:
      'Hvad er svaret på det ultimate spørgsmål om livet, universet og alting? Kom til en spændende aften hvor vi spørger ChatGPT om svarene!',
    start: dayjs().add(4, 'hour').toDate(),
    end: dayjs().add(5, 'hour').toDate(),
  },
  {
    id: '2',
    title: 'Rust',
    description: 'Grup grup grup grup grup grup grup',
    start: dayjs().add(6, 'hour').toDate(),
    end: dayjs().add(7, 'hour').toDate(),
  },
  {
    id: '3',
    title: 'Event before now',
    description: 'What even is now?',
    start: dayjs().subtract(2, 'hour').toDate(),
    end: dayjs().subtract(1, 'hour').toDate(),
  },
];

const eventsAtom = atom<Event[] | undefined>({
  key: 'mockedEvents',
  default: events,
});

export { events, eventsAtom };
