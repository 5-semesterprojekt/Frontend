import { atom } from 'recoil';

import { Event } from '../types/event';

const events: Event[] = [
  {
    id: '0',
    title: 'Brætspilsaften',
    description:
      'I aften står den på hygge med brætspil, kaffe og kage. Kom glad og tag gerne nogle af dine brætspil med!',
    start: new Date('2023-10-23T19:00'),
    end: new Date('2023-10-23T22:00'),
  },
  {
    id: '1',
    title: 'Undervisning',
    description:
      'Hvad er svaret på det ultimate spørgsmål om livet, universet og alting? Kom til en spændende aften hvor vi spørger ChatGPT om svarene!',
    start: new Date('2023-10-24T09:00'),
    end: new Date('2023-10-24T15:00'),
  },
  {
    id: '2',
    title: 'Rust',
    description: 'Grup grup grup grup grup grup grup',
    start: new Date('2023-10-25T01:00'),
    end: new Date('2023-10-25T23:00'),
  },
];

const eventsAtom = atom<Event[]>({ key: 'mockedEvents', default: events });

export { events, eventsAtom };
