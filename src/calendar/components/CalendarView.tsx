import { Button, Calendar, CalendarProps, Row, Space } from 'antd';
import { Dayjs } from 'dayjs';
import { Event } from '../types/event';
import { PlusIcon } from '../../components/Icons';
import showEventModal from './Event.modal';
import CalendarCell from './CalendarCell';

function CalendarView({ events }: { events: Event[] }) {
  const dateCellRender = (value: Dayjs) => (
    <CalendarCell
      events={events.filter(
        (event) =>
          new Date(event.start).toDateString() ===
          value.toDate().toDateString(),
      )}
    />
  );

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <Space direction="vertical" size="middle">
      <Row justify="end">
        <Button
          icon={<PlusIcon />}
          onClick={() => showEventModal()}
          type="primary"
        >
          Tilføj begivenhed
        </Button>
      </Row>
      <Calendar
        mode="month"
        headerRender={() => <></>}
        cellRender={cellRender}
      />
    </Space>
  );
}

export default CalendarView;
