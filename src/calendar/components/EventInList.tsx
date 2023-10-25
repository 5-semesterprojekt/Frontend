import { Button, Card, Space, Typography } from 'antd';
import showEventModal from './EventModal';
import { Event } from '../types/event';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export interface EventProps {
  event: Event;
}

function EventInList({ event }: EventProps) {
  const endFormat =
    new Date(event.start).getDate() === new Date(event.end).getDate()
      ? 'LT'
      : 'lll';

  return (
    <Card data-testid="event">
      <Space direction="vertical">
        <Title level={4} style={{ margin: 0 }}>
          {event.title}
        </Title>
        <Text>
          {dayjs(new Date(event.start)).format('lll')} -{' '}
          {dayjs(new Date(event.end)).format(endFormat)}
        </Text>
        <Text>{event.description}</Text>
        <Button onClick={() => showEventModal(event)}>Ændr</Button>
      </Space>
    </Card>
  );
}

export default EventInList;
