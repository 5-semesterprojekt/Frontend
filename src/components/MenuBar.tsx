import { MenuProps, Menu, Button, Row, Col } from 'antd';
import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { useAuth } from '../auth/hooks/useAuth';

import {
  HouseIcon,
  AboutIcon,
  LoginIcon,
  CalendarIcon,
  AccountIcon,
} from './Icons';

type MenuItem = Required<MenuProps>['items'][number];

function MenuBar() {
  const location = useLocation();
  const { user, signOutUser } = useAuth();

  const getItem = (label: string, to: string, icon?: ReactNode): MenuItem =>
    ({
      icon,
      key: to,
      label: <Link to={to}>{label}</Link>,
    }) as MenuItem;

  const items = [
    {
      title: 'Hjem',
      url: '/hjem',
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
      title: 'Om os',
      url: '/om-os',
      visible: true,
      icon: <AboutIcon />,
    },
    {
      title: 'Log ind',
      url: '/log-ind',
      visible: !user,
      icon: <LoginIcon />,
    },
    {
      title: 'Konto',
      url: '/konto',
      visible: user,
      icon: <AccountIcon />,
    },
  ];

  const menuItems: MenuProps['items'] = items
    .filter((item) => item.visible)
    .map((item) => getItem(item.title, item.url, item.icon));

  return (
    <Row>
      <Col span={20}>
        <Menu
          items={menuItems}
          selectedKeys={items
            .filter((item) => location.pathname.startsWith(item.url))
            .map((item) => item.url)}
          mode="horizontal"
          style={{ borderBottom: 0 }}
        />
      </Col>
      <Col>{user && <Button onClick={() => signOutUser()}>Log af</Button>}</Col>
    </Row>
  );
}

export default MenuBar;
