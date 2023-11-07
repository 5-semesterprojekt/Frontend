import { Button, Card, Dropdown, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useState } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { GetEvents } from '../state/event';
import { mainApi } from '../../lib/api';
import { Event } from '../types/event';
import { DeleteIcon, EditIcon, ThreeDotsIcon } from '../../components/Icons';
import { notify } from '../../services/NotificationService';
import { organizationConfig } from '../../../config/organization';

import showEventModal from './Event.modal';

dayjs.extend(LocalizedFormat);

const { Title, Text } = Typography;

export interface EventProps {
  event: Event;
}

function EventInList({ event }: EventProps) {
  const [deleting, setDeleting] = useState(false);
  const refreshEvents = useRecoilRefresher_UNSTABLE(GetEvents);

  const endFormat =
    event.start.getDate() === event.end.getDate() ? 'LT' : 'lll';

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

  const dropdown: ItemType[] = [
    {
      key: `${event.id}-edit`,
      label: 'Ændr',
      icon: <EditIcon />,
      onClick: editEvent,
    },
    {
      key: `${event.id}-delete`,
      icon: <DeleteIcon />,
      label: 'Slet',
      onClick: deleteEvent,
      disabled: deleting,
    },
  ];

  return (
    <Card data-testid="event">
      <Space direction="vertical">
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            {event.title}
          </Title>
          <Dropdown
            trigger={['click']}
            menu={{ items: dropdown }}
            placement="bottomRight"
          >
            <Button icon={<ThreeDotsIcon />} type="text" />
          </Dropdown>
        </Space>
        <Text>
          <Space>
            {startDate}-{endDate}
          </Space>
        </Text>
        <Text>{event.description}</Text>
      </Space>
    </Card>
  );
}

export default EventInList;
