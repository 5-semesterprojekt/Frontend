import { Space, Spin } from 'antd';
import { Suspense } from 'react';
import CalendarView from './components/CalendarView';
import { useRecoilValue } from 'recoil';
import { GetEvents } from './state/event';
import Page from '../components/Page';

export default function CalendarPage() {
  const events = useRecoilValue(GetEvents);

  return (
    <Page title="Kalender">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Suspense fallback={<Spin />}>
          <CalendarView events={events} />
        </Suspense>
      </Space>
    </Page>
  );
}
