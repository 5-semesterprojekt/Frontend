import { Button, Row, Space } from 'antd';
import { Event } from '../types/event';
import { PlusIcon } from '../../components/Icons';
import showEventModal from './Event.modal';
import CalendarCell from './CalendarCell';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';

function CalendarView({ events }: { events: Event[] }) {
  const [month] = useState(dayjs().month());

  const { weeks } = useMemo(() => {
    const firstDayOfCalendar = dayjs()
      .month(month)
      .startOf('month')
      .startOf('week');
    const lastDayOfCalendar = dayjs().month(month).endOf('month').endOf('week');

    const numberOfWeeks =
      (lastDayOfCalendar.diff(firstDayOfCalendar, 'day') + 1) / 7;

    const weeks = [];
    for (let i = 0; i < numberOfWeeks; i++) {
      const week: Dayjs[] = [];

      for (let j = 0; j < 7; j++) {
        week.push(dayjs(firstDayOfCalendar).add(i * 7 + j, 'day'));
      }

      weeks.push(week);
    }

    return { weeks };
  }, [month]);

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
      <table style={{ tableLayout: 'fixed', width: '100%', borderSpacing: 8 }}>
        <thead>
          <tr>
            <td>ma.</td>
            <td>ti.</td>
            <td>on.</td>
            <td>to.</td>
            <td>fr.</td>
            <td>lø.</td>
            <td>sø.</td>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={'w' + index}>
              {week.map((day) => (
                <CalendarCell
                  key={day.toDate().toDateString()}
                  date={day.toDate()}
                  events={events.filter(
                    (event) =>
                      new Date(event.start).toDateString() ===
                      day.toDate().toDateString(),
                  )}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Space>
  );
}

export default CalendarView;
