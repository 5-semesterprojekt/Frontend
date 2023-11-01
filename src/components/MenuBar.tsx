import { MenuProps, Menu } from "antd";
import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { HouseIcon, AboutIcon, LoginIcon, RegisterIcon } from "./Icons";

type MenuItem = Required<MenuProps>['items'][number];

function MenuBar() {
  const location = useLocation();

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
      title: 'Om os',
      url: '/om-os',
      visible: true,
      icon: <AboutIcon />,
    },
    {
      title: 'Log ind',
      url: '/log-ind',
      visible: true,
      icon: <LoginIcon />,
    },
    {
      title: 'Opret bruger',
      url: '/registrer',
      visible: true,
      icon: <RegisterIcon />,
    },
  ];

  const menuItems: MenuProps['items'] = items
    .filter((item) => item.visible)
    .map((item) => getItem(item.title, item.url, item.icon));

  return (
    <Menu
        items={menuItems}
        selectedKeys={items
          .filter((item) => location.pathname.startsWith(item.url))
          .map((item) => item.url)}
        mode="horizontal"
      />
  )
}

export default MenuBar