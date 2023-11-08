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
import showConfirmModal from '../../components/Confirm.modal';

import showEventModal from './Event.modal';

dayjs.extend(LocalizedFormat);

export default function CalendarEvent({ event }: { event: Event }) {
  const [deleting, setDeleting] = useState(false);
  const refreshEvents = useRecoilRefresher_UNSTABLE(GetEvents);

  const title = event.title;

  const endFormat =
    new Date(event.start || new Date()).getDate() ===
    new Date(event.end || new Date()).getDate()
      ? 'LT'
      : 'lll';

  const startDate = dayjs(event.start).format('lll').toString();
  const endDate = dayjs(event.end).format(endFormat).toString();

  const editEvent = () => showEventModal({ event, newEvent: false });
  const deleteEvent = async () => {
    setDeleting(true);

    showConfirmModal({
      title: 'Slet begivenhed',
      message: 'Er du sikker på at du vil slette begivenheden?',
      okText: 'Slet',
      okButtonProps: { danger: true },
      onOk: async () => {
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
      },
    });

    setDeleting(false);
  };

  return (
    <Popover
      key={event.id || 'temp'}
      content={
        event && (
          <Space direction="vertical">
            <b>{title}</b>
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
                danger
                onClick={deleteEvent}
              >
                Slet
              </Button>
            </Space>
          </Space>
        )
      }
      trigger="click"
    >
      <Tag
        key={event.id}
        color={event ? 'red' : undefined}
        style={{ margin: 0, width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ whiteSpace: 'normal' }}>
          {dayjs(event.start).format('HH:mm')} - {title}
        </span>
      </Tag>
    </Popover>
  );
}
