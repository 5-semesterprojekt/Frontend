import { Navigate, Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import { Suspense, lazy } from 'react';
import { Col, Row, Spin } from 'antd';

const CalendarPage = lazy(() => import('./calendar/CalendarPage'));
const LoginPage = lazy(() => import('./auth/LoginPage'));
const RegisterPage = lazy(() => import('./auth/RegisterPage'));

function App() {
  return (
    <Row justify="center">
      <Col span={12} style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <MenuBar />
        <div style={{ padding: 16 }}>
          <Suspense fallback={<Spin />}>
            <Routes>
              <Route path="/" element={<Navigate to="/hjem" replace />} />
              <Route path="/hjem" element={<CalendarPage />} />
              <Route
                path="/om-os"
                element={<div>Odense LMU er en forening</div>}
              />
              <Route path="/log-ind" element={<LoginPage />} />
              <Route path="/registrer" element={<RegisterPage />} />
              <Route
                path="*"
                element={<div>404 - Denne side findes ikke</div>}
              />
            </Routes>
          </Suspense>
        </div>
      </Col>
    </Row>
  );
}

export default App;
