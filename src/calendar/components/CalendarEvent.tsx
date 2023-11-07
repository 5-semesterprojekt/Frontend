import { Button, Popover, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import { Event } from '../types/event';
import { DeleteIcon, EditIcon } from '../../components/Icons';
import { organizationConfig } from '../../../config/organization';
import { mainApi } from '../../lib/api';
import { GetEvents } from '../state/event';
import { notify } from '../../services/NotificationService';

import showEventModal from './Event.modal';

dayjs.extend(LocalizedFormat);

export default function CalendarEvent({ event }: { event: Event }) {
  const [deleting, setDeleting] = useState(false);
  const refreshEvents = useRecoilRefresher_UNSTABLE(GetEvents);

  const endFormat =
    new Date(event.start).getDate() === new Date(event.end).getDate()
      ? 'LT'
      : 'lll';

  const startDate = dayjs(event.start).format('lll').toString();
  const endDate = dayjs(event.end).format(endFormat).toString();

  const editEvent = () => showEventModal(event);
  const deleteEvent = async () => {
    setDeleting(true);
    try {
      const response = await mainApi.delete(
        `/events/${organizationConfig.id}/${event.id}`,
      );
      if (response.ok) {
        refreshEvents();
      } else {
        throw response;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      notify('error', 'Fejl', 'Kunne ikke slette begivenheden');
    }
    setDeleting(false);
  };

  return (
    <Popover
      key={event.id}
      content={
        <Space direction="vertical">
          <b>{event.title}</b>
          <span>
            {startDate} - {endDate}
          </span>
          <span
            style={{ maxWidth: 400, display: 'block', whiteSpace: 'normal' }}
          >
            {event.description}
          </span>
          <Space>
            <Button icon={<EditIcon />} onClick={editEvent}>
              Ændr
            </Button>
            <Button
              disabled={deleting}
              icon={<DeleteIcon />}
              onClick={deleteEvent}
            >
              Slet
            </Button>
          </Space>
        </Space>
      }
      trigger="click"
    >
      <Tag key={event.id} color="red" style={{ margin: 0, width: '100%' }}>
        <span style={{ whiteSpace: 'normal' }}>
          {dayjs(event.start).format('HH:mm')} - {event.title}
        </span>
      </Tag>
    </Popover>
  );
}
