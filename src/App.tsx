import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Button, Col, Result, Row, Space } from 'antd';

import MenuBar from './components/MenuBar';
import FullPageSpin from './components/FullPageSpin';
import {
  FacebookIcon,
  QuestionIcon,
  TwitterIcon,
  YouTubeIcon,
} from './components/Icons';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import AuthorizationErrorBoundary from './auth/components/AuthorizationErrorBoundary';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const AboutPage = lazy(() => import('@/pages/about/AboutPage'));
const CalendarPage = lazy(() => import('@/pages/calendar/CalendarPage'));
const LoginPage = lazy(() => import('./auth/LoginPage'));
const RegisterPage = lazy(() => import('./auth/RegisterPage'));
const AccountPage = lazy(() => import('./auth/AccountPage'));

function App() {
  return (
    <Row justify="center">
      <Col
        lg={20}
        xl={14}
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header>
          <Row style={{ padding: '32px 64px' }}>
            <Col span={4}>
              <Link to="/">
                <img src="/logo.png" style={{ width: '100%' }} />
              </Link>
            </Col>
          </Row>
          <Suspense>
            <MenuBar />
          </Suspense>
        </header>
        <article style={{ flex: 1 }}>
          <Suspense fallback={<FullPageSpin />}>
            <Routes>
              <Route path="/" element={<Navigate to="/hjem" replace />} />
              <Route path="/hjem" element={<HomePage />} />
              <Route path="/kalender" element={<CalendarPage />} />
              <Route path="/om-os" element={<AboutPage />} />
              <Route path="/log-ind" element={<LoginPage />} />
              <Route path="/registrer" element={<RegisterPage />} />
              <Route
                path="/konto"
                element={
                  <AuthorizationErrorBoundary
                    fallback={<Navigate to="/log-ind" />}
                  >
                    <AccountPage />
                  </AuthorizationErrorBoundary>
                }
              />
              <Route
                path="/glemt-adgangskode"
                element={<ForgotPasswordPage />}
              />
              <Route
                path="*"
                element={
                  <Result
                    icon={<QuestionIcon />}
                    title="Denne side findes ikke"
                  />
                }
              />
            </Routes>
          </Suspense>
        </article>
        <footer
          style={{
            backgroundColor: '#E1E1E1',
            width: '100%',
            padding: 32,
            boxSizing: 'border-box',
          }}
        >
          <Row justify="space-between">
            <Col>
              Luthersk Missions Unge i Odense
              <br />
              Rosenlunden 15
              <br />
              5000 Odense C<br />
              odense@lmu.dk
              <br />
              CVR-nr.: 30789334
            </Col>
            <Col>
              <Space direction="vertical">
                <Button icon={<FacebookIcon />} shape="circle" />
                <Button icon={<TwitterIcon />} shape="circle" />
                <Button icon={<YouTubeIcon />} shape="circle" />
              </Space>
            </Col>
          </Row>
        </footer>
      </Col>
    </Row>
  );
}

export default App;
