import { Result, Space, Spin } from 'antd';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CalendarView from './components/CalendarView';
import { GetEvents } from './state/event';

import Page from '@/components/Page';
import { QuestionIcon } from '@/components/Icons';

export default function CalendarPage() {
  return (
    <Page title="Kalender">
      <Space direction="vertical" style={{ width: '100%' }}>
        <ErrorBoundary
          fallback={
            <Result
              status="warning"
              icon={<QuestionIcon />}
              title="Begivenheder kunne ikke hentes"
            />
          }
        >
          <Suspense fallback={<Spin />}>
            <CalendarView recoilSource={GetEvents} />
          </Suspense>
        </ErrorBoundary>
      </Space>
    </Page>
  );
}
