import { Button, Row, Space, Spin } from 'antd';
import showEventModal from './components/EventModal';
import { Suspense } from 'react';
import { PlusIcon } from '../components/Icons';
import CalendarView from './components/CalendarView';
import { useRecoilValue } from 'recoil';
import { GetEvents } from './state/event';

function CalendarPage() {
  const events = useRecoilValue(GetEvents);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="end">
        <Button
          icon={<PlusIcon />}
          onClick={() => showEventModal()}
          type="primary"
        >
          Add event
        </Button>
      </Row>
      <Suspense fallback={<Spin />}>
        <CalendarView events={events} />
      </Suspense>
    </Space>
  );
}

export default CalendarPage;
