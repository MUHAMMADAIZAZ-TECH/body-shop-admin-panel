import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { NavTitle } from './style';
import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

function MenuItems({ darkMode, toggleCollapsed, topMenu, events }) {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
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
      key: "salon",
      icon: !topMenu && <FeatherIcon icon="database" />,
      title: "Salons",
      items: [
        {
          key: "salon-view",
          link: `${path}/salon/salon-view`,
          label: "Salons",
        },
        {
          key: "salon-request",
          link: `${path}/salon/request-view`,
          label: "Salon Requests",
        },
        {
          key: "salon-reviews",
          link: `${path}/salon/review-view`,
          label: "Salon Reviews",
        },
        {
          key: "salon-hours",
          link: `${path}/salon/availibility-hours-view`,
          label: "Availability hours",
        },
        // {
        //   key: "salon-addresses",
        //   link: `${path}/salon/address-view`,
        //   label: "Addresses",
        // },
      ],
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
            `${mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
            }`,
          ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="home" />}
        key="dashboard"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>
      {!topMenu && <NavTitle className="sidebar-nav-title">App Management</NavTitle>}
      {subMenuArray && subMenuArray.map((submenu) => (
        <SubMenu key={submenu.key} icon={submenu.icon} title={submenu.title}>
          {submenu.items.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={item.link}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="Categories"
      >
        <NavLink to={`${path}/categories/category-view`}>
          Categories
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="services-list"
      >
         <NavLink to={`${path}/services/services-list-view`}>
            Services
          </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="bookings"
      >
         <NavLink to={`${path}/bookings/bookings-view`}>
            Bookings
          </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="Coupons"
      >
        <NavLink to={`${path}/coupons/coupons-view`}>
          Coupons
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="faq"
      >
          <NavLink to={`${path}/faq-admin/faqs-view`}>
            Faqs
          </NavLink>
      </Menu.Item>
      {/* {!topMenu && <NavTitle className="sidebar-nav-title">Payments</NavTitle>} */}
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="Payments"
      >
         <NavLink to={`${path}/payment/paymentlist-view`}>
            Payments
          </NavLink>
      </Menu.Item>
      {!topMenu && <NavTitle className="sidebar-nav-title">Settings</NavTitle>}
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="database" />}
        key="Packages"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Medias Library
        </NavLink>
      </Menu.Item>
      <SubMenu key="crud" icon={!topMenu && <FeatherIcon icon="database" />} title="Mobile App Settings">
        <Menu.Item key="axios-view">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-view`}>
            Global Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Theme
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Mobile Authentication
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Custom Pages
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Slides
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="crud" icon={!topMenu && <FeatherIcon icon="database" />} title="Settings">
        <Menu.Item key="axios-view">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-view`}>
            Global Settings
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Users
          </NavLink>
        </Menu.Item>
        <SubMenu key="crud" icon={!topMenu && <FeatherIcon icon="database" />} title="Roles & Permissions">
          <Menu.Item key="axios-view">
            <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-view`}>
              Permissions List
            </NavLink>
          </Menu.Item>
          <Menu.Item key="axios-add">
            <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
              Create Permission
            </NavLink>
          </Menu.Item>
          <Menu.Item key="axios-add">
            <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
              Roles List
            </NavLink>
          </Menu.Item>
          <Menu.Item key="axios-add">
            <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
              Create Role
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Custom Fields
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Localisation
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Translation
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Currencies
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Taxes
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Payment
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Social Authentication
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Push Notifications
          </NavLink>
        </Menu.Item>
        <Menu.Item key="axios-add">
          <NavLink onClick={toggleCollapsed} to={`${path}/crud/axios-add`}>
            Mail
          </NavLink>
        </Menu.Item>
      </SubMenu>
      {/* Default Template */}
      {!topMenu && <NavTitle className="sidebar-nav-title">Template Pages</NavTitle>}
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
        <Menu.Item key="topMenu">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeTopNav();
            }}
            to="#"
          >
            Top Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="sideMenu">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeSideNav();
            }}
            to="#"
          >
            Side Menu
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
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/changelog`}>
              <FeatherIcon icon="activity" />
            </NavLink>
          )
        }
        key="changelog"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/changelog`}>
          Changelog
          <span className="badge badge-primary menuItem">{versions[0].version}</span>
        </NavLink>
      </Menu.Item>
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
