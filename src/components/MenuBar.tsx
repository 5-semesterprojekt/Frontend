import {
  MenuProps,
  Menu,
  Button,
  Row,
  Col,
  Avatar,
  Space,
  Popover,
} from 'antd';
import { ReactNode } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/hooks/useAuth';

import {
  HouseIcon,
  AboutIcon,
  LoginIcon,
  CalendarIcon,
  AccountIcon,
  LogOutIcon,
} from './Icons';

type MenuItem = Required<MenuProps>['items'][number];

function MenuBar() {
  const location = useLocation();
  const navigate = useNavigate();
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
  ];

  const menuItems: MenuProps['items'] = items
    .filter((item) => item.visible)
    .map((item) => getItem(item.title, item.url, item.icon));

  return (
    <Row>
      <Col flex="auto" style={{ marginLeft: 16 }}>
        <Menu
          items={menuItems}
          selectedKeys={items
            .filter((item) => location.pathname.startsWith(item.url))
            .map((item) => item.url)}
          mode="horizontal"
          style={{ borderBottom: 0 }}
        />
      </Col>
      <Col style={{ marginRight: 16 }}>
        {user && (
          <Button type='text'>
            <Popover
              content={
                <Space direction="vertical">
                  <Button
                    icon={<AccountIcon />}
                    type="text"
                    onClick={() => navigate('/konto')}
                    style={{ width: '100%' }}
                  >
                    Konto
                  </Button>
                  <Button
                    icon={<LogOutIcon />}
                    type="text"
                    onClick={() => signOutUser()}
                    style={{ width: '100%' }}
                  >
                    Log af
                  </Button>
                </Space>
              }
              placement="bottomRight"
            >
              <Space>
                <Avatar
                  icon={<AccountIcon style={{ fontSize: '0.8rem' }} />}
                  size="small"
                />
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
              </Space>
            </Popover>
          </Button>
        )}
      </Col>
    </Row>
  );
}

export default MenuBar;
