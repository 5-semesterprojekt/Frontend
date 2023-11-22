import { Button, Row, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

import { Event } from '../types/event';
import { PlusIcon } from '../../components/Icons';

import showEventModal from './Event.modal';
import CalendarCell from './CalendarCell';

import { useAuth } from '@/auth/hooks/use-auth';

function CalendarView({
  recoilSource,
}: {
  recoilSource: RecoilState<Event[]>;
}) {
  const { user } = useAuth();
  const events = useRecoilValue(recoilSource);
  const [month, setMonth] = useState(dayjs().month());

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
        <Space size="middle">
          <Space>
            <Button onClick={() => setMonth((current) => current - 1)}>
              -
            </Button>
            {dayjs().month(month).format('MMMM')}-
            {dayjs().month(month).get('year')}
            <Button onClick={() => setMonth((current) => current + 1)}>
              +
            </Button>
          </Space>
          {user && (
            <Button
              icon={<PlusIcon />}
              onClick={() =>
                showEventModal({
                  event: {
                    title: 'Ny begivenhed',
                    start: new Date(),
                    end: new Date(),
                  },
                })
              }
              type="primary"
            >
              Tilføj begivenhed
            </Button>
          )}
        </Space>
      </Row>
      <table
        style={{
          tableLayout: 'fixed',
          width: '100%',
          borderSpacing: 0,
          borderCollapse: 'collapse',
        }}
      >
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
                  inMonth={day.month() === month % 12}
                  events={events.filter(
                    (event) =>
                      event.start.toDateString() ===
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
