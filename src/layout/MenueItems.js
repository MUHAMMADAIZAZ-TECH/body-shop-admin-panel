import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { NavTitle } from './style';

const { SubMenu } = Menu;

function MenuItems({ darkMode, toggleCollapsed, topMenu, events }) {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };
  const subMenuArray = [
    {
      key: 'salon',
      icon: !topMenu && <FeatherIcon icon="scissors" />,
      title: 'Salons',
      items: [
        {
          key: 'salon-view',
          link: `${path}/salon/salon-view`,
          label: 'Salons',
        },
        {
          key: 'salon-request',
          link: `${path}/salon/request-view`,
          label: 'Salon Requests',
        },
        {
          key: 'salon-reviews',
          link: `${path}/salon/review-view`,
          label: 'Salon Reviews',
        },
        {
          key: 'salon-hours',
          link: `${path}/salon/availibility-hours-view`,
          label: 'Availability hours',
        },
        // {
        //   key: "salon-addresses",
        //   link: `${path}/salon/address-view`,
        //   label: "Addresses",
        // },
      ],
    },
  ];
  const menuItems = [
    {
      icon: !topMenu && <FeatherIcon icon="grid" />,
      key: 'Categories',
      link: `${path}/categories/category-view`,
      label: 'Categories',
    },
    {
      icon: !topMenu && <FeatherIcon icon="layers" />,
      key: 'services-list',
      link: `${path}/services/services-list-view`,
      label: 'Services',
    },
    {
      icon: !topMenu && <FeatherIcon icon="calendar" />,
      key: 'bookings',
      link: `${path}/bookings/bookings-view`,
      label: 'Bookings',
    },
    {
      icon: !topMenu && <FeatherIcon icon="gift" />,
      key: 'Coupons',
      link: `${path}/coupons/coupons-view`,
      label: 'Coupons',
    },
    {
      icon: !topMenu && <FeatherIcon icon="help-circle" />,
      key: 'faq',
      link: `${path}/faq-admin/faqs-view`,
      label: 'Faqs',
    },
    {
      icon: !topMenu && <FeatherIcon icon="dollar-sign" />,
      key: 'Payments',
      link: `${path}/payment/paymentlist-view`,
      label: 'Payments',
    },
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item icon={!topMenu && <FeatherIcon icon="home" />} key="dashboard">
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>
      {!topMenu && <NavTitle className="sidebar-nav-title">App Management</NavTitle>}
      {subMenuArray &&
        subMenuArray.map((submenu) => (
          <SubMenu key={submenu.key} icon={submenu.icon} title={submenu.title}>
            {submenu.items.map((item) => (
              <Menu.Item key={item.key}>
                <NavLink to={item.link}>{item.label}</NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      {menuItems.map((menuItem) => (
        <Menu.Item key={menuItem.key} icon={menuItem.icon}>
          <NavLink to={menuItem.link}>{menuItem.label}</NavLink>
        </Menu.Item>
      ))}
      {!topMenu && <NavTitle className="sidebar-nav-title">Settings</NavTitle>}
      <SubMenu key="Settings" icon={!topMenu && <FeatherIcon icon="settings" />} title="Settings">
        <Menu.Item key="custompages">
          <NavLink onClick={toggleCollapsed} to={`${path}/settings/custompages/view`}>
            Custom Pages
          </NavLink>
        </Menu.Item>
        <Menu.Item key="config">
          <NavLink onClick={toggleCollapsed} to={`${path}/settings/config/view`}>
            Config Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item key="reservationfee">
          <NavLink onClick={toggleCollapsed} to={`${path}/settings/reservationfee/view`}>
            Reservation Fee
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="layout" icon={!topMenu && <FeatherIcon icon="layout" />} title="Layouts">
        <Menu.Item key="light">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeLight();
            }}
            to="#"
          >
            Light Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dark">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeDark();
            }}
            to="#"
          >
            Dark Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rtl">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              onRtlChange();
            }}
            to="#"
          >
            RTL
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ltr">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              onLtrChange();
            }}
            to="#"
          >
            LTR
          </NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
