import { Space } from 'antd';
import { useState } from 'react';

import { Event } from '../types/event';
import { notify } from '../../services/NotificationService';

import CalendarEvent from './CalendarEvent';
import showEventModal from './Event.modal';

import { useAuth } from '@/auth/hooks/use-auth';

export default function CalendarCell({
  date,
  events,
  inMonth,
}: {
  date: Date;
  events: Event[];
  inMonth: boolean;
}) {
  const { user } = useAuth();
  const [temporaryEvent] = useState<Event>({
    title: 'Ny begivenhed',
    start: date,
    end: date,
  });
  const [showTemporaryEvent, setShowTemporaryEvent] = useState(false);

  const addEvent = async () => {
    if (user) {
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
    }
  };

  return (
    <td
      style={{
        borderTop: '1px solid black',
        borderRight: '1px solid lightgray',
        borderLeft: '1px solid lightgray',
        backgroundColor: inMonth ? 'initial' : 'lightgray',
        verticalAlign: 'top',
        padding: 4,
      }}
      onClick={addEvent}
    >
      <div
        style={{
          verticalAlign: 'top',
          minHeight: 64
        }}
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
      </div>
    </td>
  );
}
