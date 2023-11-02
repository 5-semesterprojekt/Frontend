import { Space, Tag } from 'antd';
import { Event } from '../types/event';
import showEventModal from './Event.modal';
import dayjs from 'dayjs';

export default function CalendarCell({
  date,
  events,
}: {
  date: Date;
  events: Event[];
}) {
  return (
    <td style={{ verticalAlign: 'top', borderTop: '1px solid', height: 64 }}>
      <Space
        direction="vertical"
        style={{ width: '100%', height: '100%', paddingTop: 4 }}
      >
        {date.getDate()}
        {events.map((event) => (
          <Tag
            key={event.id}
            color="red"
            style={{ margin: 0, width: '100%' }}
            onClick={() => showEventModal(event)}
          >
            <span style={{ whiteSpace: 'normal' }}>
              {dayjs(event.start).format('HH:mm')} - {event.title}
            </span>
          </Tag>
        ))}
      </Space>
    </td>
  );
}
