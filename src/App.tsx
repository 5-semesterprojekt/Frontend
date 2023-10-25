import EventList from './calendar/components/EventList';
import { useRecoilValue } from 'recoil';
import { GetEvents } from './calendar/state/event';
import { Button, Space } from 'antd';
import showEventModal from './calendar/components/EventModal';

function App() {
  const events = useRecoilValue(GetEvents);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={showEventModal} type="primary">
        Add event
      </Button>
      <EventList events={events} />
    </Space>
  );
}

export default App;
