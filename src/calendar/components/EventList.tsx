import { Space } from 'antd';
import { Event } from '../types/event';
import EventInList from './EventInList';

export interface EventListProps {
  events: Event[];
}

function EventList({ events }: EventListProps) {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {events.map((event) => (
        <EventInList
          key={`event-${event.id}`}
          event={event}
        />
      ))}
    </Space>
  );
}

export default EventList;
