import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const BookingsView = lazy(() => import('../../container/bookings/bookings/Index'));
const BookingsAdd = lazy(() => import('../../container/bookings/bookings/Add'));
const BookingsEdit = lazy(() => import('../../container/bookings/bookings/Edit'));

const BookingsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/bookings/bookings-view`} component={BookingsView} />
      <Route path={`${path}/bookings/bookings-add`} component={BookingsAdd} />
      <Route exact path={`${path}/bookings/edit/:id`} component={BookingsEdit} />
    </Switch>
  );
};

export default BookingsRoute;
