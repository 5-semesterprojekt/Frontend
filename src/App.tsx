import { events } from './calendar/tests/Event.fixtures';
import EventList from './calendar/components/EventList';

function App() {
  return <EventList events={events} />;
}

export default App;
