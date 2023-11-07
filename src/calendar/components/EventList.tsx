import { Space } from 'antd';
import { RecoilState, useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { Event } from '../types/event';

import EventInList from './EventInList';

export interface EventListProps {
  recoilSource: RecoilState<Event[]>;
}

function EventList({ recoilSource }: EventListProps) {
  const [events, setEvents] = useRecoilState(recoilSource);

  useEffect(() => {
    setEvents(events);
  }, [events, setEvents]);

  const sortedEvents = events
    .filter((event) => event.start >= new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {sortedEvents.map((event) => (
        <EventInList key={`event-${event.id}`} event={event} />
      ))}
    </Space>
  );
}

export default EventList;
