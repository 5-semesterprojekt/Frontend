import { Space } from 'antd';

import { Event } from '../types/event';

import CalendarEvent from './CalendarEvent';

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
          <CalendarEvent key={event.id} event={event} />
        ))}
      </Space>
    </td>
  );
}
