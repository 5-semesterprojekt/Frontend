import { Space } from 'antd';
import { useState } from 'react';

import { Event } from '../types/event';
import { notify } from '../../services/NotificationService';

import CalendarEvent from './CalendarEvent';
import showEventModal from './Event.modal';

export default function CalendarCell({
  date,
  events,
}: {
  date: Date;
  events: Event[];
}) {
  const [temporaryEvent] = useState<Event>({
    title: 'Ny begivenhed',
    start: date,
    end: date,
  });
  const [showTemporaryEvent, setShowTemporaryEvent] = useState(false);

  const addEvent = async () => {
    try {
      setShowTemporaryEvent(true);
      await showEventModal({ event: temporaryEvent, date });
    } catch (error) {
      if (error) {
        notify('error', 'Kunne ikke tilføje begivenhed', error.toString());
      }
    } finally {
      setShowTemporaryEvent(false);
    }
  };

  return (
    <td
      style={{ verticalAlign: 'top', borderTop: '1px solid', height: 64 }}
      onClick={addEvent}
    >
      <Space
        direction="vertical"
        style={{ width: '100%', height: '100%', paddingTop: 4 }}
      >
        {date.getDate()}
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
        {showTemporaryEvent && (
          <CalendarEvent key={date.toISOString()} event={temporaryEvent} />
        )}
      </Space>
    </td>
  );
}
