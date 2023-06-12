import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const BookingsView = lazy(() => import('../../container/bookings/bookings/Index'));
const BookingsEdit = lazy(() => import('../../container/bookings/bookings/Edit'));
const ViewBooking = lazy(() => import('../../container/bookings/bookings/ViewBooking'));

const BookingsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/bookings/bookings-view`} component={BookingsView} />
      <Route exact path={`${path}/bookings/edit/:id`} component={BookingsEdit} />
      <Route exact path={`${path}/bookings/view/:id`} component={ViewBooking} />
    </Switch>
  );
};

export default BookingsRoute;
