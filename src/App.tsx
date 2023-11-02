import { Link, Navigate, Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import { Suspense, lazy } from 'react';
import { Col, Row } from 'antd';
import FullPageSpin from './components/FullPageSpin';
import AboutPage from './about/AboutPage';

const HomePage = lazy(() => import('./home/HomePage'));
const CalendarPage = lazy(() => import('./calendar/CalendarPage'));
const LoginPage = lazy(() => import('./auth/LoginPage'));
const RegisterPage = lazy(() => import('./auth/RegisterPage'));

function App() {
  return (
    <Row justify="center">
      <Col span={14} style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <Row style={{ padding: '32px 64px' }}>
          <Col span={4}>
            <Link to="/">
              <img src="/logo.png" style={{ width: '100%' }} />
            </Link>
          </Col>
        </Row>
        <MenuBar />
        <Suspense fallback={<FullPageSpin />}>
          <Routes>
            <Route path="/" element={<Navigate to="/hjem" replace />} />
            <Route path="/hjem" element={<HomePage />} />
            <Route path="/kalender" element={<CalendarPage />} />
            <Route path="/om-os" element={<AboutPage />} />
            <Route path="/log-ind" element={<LoginPage />} />
            <Route path="/registrer" element={<RegisterPage />} />
            <Route path="*" element={<div>404 - Denne side findes ikke</div>} />
          </Routes>
        </Suspense>
      </Col>
    </Row>
  );
}

export default App;
