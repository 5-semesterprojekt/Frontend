import { Space, Spin, Typography } from 'antd';
import { Suspense } from 'react';
import EventList from '../calendar/components/EventList';
import { EventCache, GetEvents } from '../calendar/state/event';

const { Title } = Typography;

function Home() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={3}>Kommende begivenheder</Title>
      <Suspense
        fallback={
          <Spin>
            <EventList recoilSource={EventCache} />
          </Spin>
        }
      >
        <EventList recoilSource={GetEvents} />
      </Suspense>
    </Space>
  );
}

export default Home;
