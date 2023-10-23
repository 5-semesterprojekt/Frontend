import { Card, Space, Typography } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

export interface EventProps {
  title: string;
  description?: string;
  start: Date;
  end: Date;
}

function EventInList({ title, description, start, end }: EventProps) {
  const endFormat = start.getDate() === end.getDate() ? 'LT' : 'lll';

  return (
    <Card>
      <Space direction="vertical">
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        <Text>
          {moment(start).format('lll')} - {moment(end).format(endFormat)}
        </Text>
        <Text>{description}</Text>
      </Space>
    </Card>
  );
}

export default EventInList;
