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
          title={event.title}
          description={event.description}
          start={new Date(event.start)}
          end={new Date(event.end)}
        />
      ))}
    </Space>
  );
}

export default EventList;
