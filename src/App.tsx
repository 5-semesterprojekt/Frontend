import { Menu, MenuProps } from 'antd';
import CalendarPage from './calendar/CalendarPage';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AboutIcon, CalendarIcon, HouseIcon } from './components/Icons';
import { ReactNode } from 'react';
import HomePage from './home/HomePage';

type MenuItem = Required<MenuProps>['items'][number];

function App() {
  const location = useLocation();

  const getItem = (label: string, to: string, icon?: ReactNode): MenuItem =>
    ({
      icon,
      key: to,
      label: <Link to={to}>{label}</Link>,
    }) as MenuItem;

  const items = [
    {
      title: 'Home',
      url: '/home',
      visible: true,
      icon: <HouseIcon />,
    },
    {
      title: 'Kalender',
      url: '/kalender',
      visible: true,
      icon: <CalendarIcon />,
    },
    {
      title: 'About',
      url: '/about',
      visible: true,
      icon: <AboutIcon />,
    },
    {
      title: 'Contact',
      url: '/contact',
      visible: true,
      icon: <AboutIcon />,
    },
  ];

  const menuItems: MenuProps['items'] = items
    .filter((item) => item.visible)
    .map((item) => getItem(item.title, item.url, item.icon));

  return (
    <>
      <Menu
        items={menuItems}
        selectedKeys={items
          .filter((item) => location.pathname.startsWith(item.url))
          .map((item) => item.url)}
        mode="horizontal"
      />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/kalender" element={<CalendarPage />} />
          <Route path="/about" element={<div>Odense LMU er en forening</div>} />
          <Route path="*" element={<div>404 - Denne side findes ikke</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
