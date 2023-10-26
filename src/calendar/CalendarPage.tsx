import EventList from './components/EventList';
import { EventCache, GetEvents } from './state/event';
import { Button, Space, Spin } from 'antd';
import showEventModal from './components/EventModal';
import { Suspense } from 'react';

function Calendar() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={() => showEventModal()} type="primary">
        Add event
      </Button>
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

export default Calendar;
