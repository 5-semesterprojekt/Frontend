import { Badge, Calendar, CalendarProps } from 'antd';
import { Dayjs } from 'dayjs';
import { Event } from '../types/event';

function CalendarView({ events }: { events: Event[] }) {
  console.log(events);

  const dateCellRender = (value: Dayjs) => {
    const listData = events.filter(
      (event) => new Date(event.start).getDate() === value.toDate().getDate() && new Date(event.start).getFullYear() === value.toDate().getFullYear(),
    );
    return (
      <>
        {listData.map((item) => (
          <Badge key={item.id} color="red" text={item.title} />
        ))}
      </>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar mode="month" headerRender={() => <></>} cellRender={cellRender} />
  );
}

export default CalendarView;
