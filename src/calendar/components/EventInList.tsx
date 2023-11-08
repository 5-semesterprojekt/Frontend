import { Card, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import { Event } from '../types/event';

dayjs.extend(LocalizedFormat);

const { Title, Text } = Typography;

export interface EventProps {
  event: Event;
}

function EventInList({ event }: EventProps) {
  const endFormat =
    event.start.getDate() === event.end.getDate() ? 'LT' : 'lll';

  const startDate = dayjs(event.start).format('lll').toString();
  const endDate = dayjs(event.end).format(endFormat).toString();

  return (
    <Card data-testid="event">
      <Space direction="vertical">
        <Title level={4} style={{ margin: 0 }}>
          {event.title}
        </Title>
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
