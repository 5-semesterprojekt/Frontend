import { Tag } from 'antd';
import { Event } from '../types/event';
import showEventModal from './Event.modal';

export default function CalendarCell({ events }: { events: Event[] }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {events.map((event) => (
        <Tag
          key={event.id}
          color="red"
          style={{ margin: 0 }}
          onClick={() => showEventModal(event)}
        >
          <span style={{ whiteSpace: 'normal' }}>
            {new Date(event.start).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            - {event.title}
          </span>
        </Tag>
      ))}
    </div>
  );
}
