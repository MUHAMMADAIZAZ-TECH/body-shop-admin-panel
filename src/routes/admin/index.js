import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import withAdminLayout from '../../layout/withAdminLayout';

const Salon = lazy(() => import('./salon'));
const Categories = lazy(() => import('./categories'));
const Services = lazy(() => import('./services'));
const Bookings = lazy(() => import('./bookings'));
const Coupons = lazy(() => import('./coupons'));
const Faq = lazy(() => import('./faq'));
const Payments = lazy(() => import('./payments'));
const Settings = lazy(()=> import('./settings'));
const AdminProfile = lazy(()=> import('./adminprofile'));

function Admin() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}`} component={Salon} />
        <Route path={`${path}`} component={Categories} />
        <Route path={`${path}`} component={Services} />
        <Route path={`${path}`} component={Bookings} />
        <Route path={`${path}`} component={Coupons} />
        <Route path={`${path}`} component={Faq} />
        <Route path={`${path}`} component={Payments} />
        <Route path={`${path}`} component={Settings} />
        <Route path={`${path}`} component={AdminProfile} />
      </Suspense>
    </Switch>
  );
}

export default withAdminLayout(Admin);
