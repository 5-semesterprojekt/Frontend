import EventList from './calendar/components/EventList';
import { useRecoilValue } from 'recoil';
import { GetEvents } from './calendar/state/event';

function App() {
  const events = useRecoilValue(GetEvents);
  console.log(events);

  return <EventList events={events} />;
}

export default App;
