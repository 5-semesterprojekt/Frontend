import { Space, Spin, Typography } from 'antd';
import { Suspense } from 'react';
import EventList from '../calendar/components/EventList';
import { EventCache, GetEvents } from '../calendar/state/event';
import Page from '../components/Page';

const { Title } = Typography;

export default function Home() {
  return (
    <Page title="Hjem">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4} style={{ marginTop: 0 }}>
          Kommende begivenheder
        </Title>
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
    </Page>
  );
}
