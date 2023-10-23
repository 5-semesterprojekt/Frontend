import EventInList from './calendar/components/EventInList';
import { Event } from './calendar/types/event';

function App() {
  const event: Event = {
    id: 1,
    title: 'Brætspilsaften',
    description:
      'I aften står den på hygge med brætspil, kaffe og kage. Kom glad og tag gerne nogle af dine brætspil med!',
    start: new Date('2023-10-23T19:00').toISOString(),
    end: new Date('2023-10-23T22:00').toISOString(),
  };

  return (
    <>
      <EventInList
        title={event.title}
        description={event.description}
        start={new Date(event.start)}
        end={new Date(event.end)}
      />
    </>
  );
}

export default App;
