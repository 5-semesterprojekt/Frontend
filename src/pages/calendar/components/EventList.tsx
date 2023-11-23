import { Button, Empty, Row, Space } from 'antd';
import { RecoilState, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { Event } from '../types/event';

import EventInList from './EventInList';

export interface EventListProps {
  recoilSource: RecoilState<Event[]>;
}

function EventList({ recoilSource }: EventListProps) {
  const [events, setEvents] = useRecoilState(recoilSource);
  const [max, setMax] = useState(5);

  useEffect(() => {
    setEvents(events);
  }, [events, setEvents]);

  const sortedEvents = events
    ?.filter((event) => event.start >= new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, max);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {sortedEvents.length > 0 ? (
        <>
          {sortedEvents.map((event) => (
            <EventInList key={`event-${event.id}`} event={event} />
          ))}
          <Row justify="center">
            <Button onClick={() => setMax((value) => value + 5)}>
              Se flere
            </Button>
          </Row>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Der er ingen kommende begivenheder"
        />
      )}
    </Space>
  );
}

export default EventList;
