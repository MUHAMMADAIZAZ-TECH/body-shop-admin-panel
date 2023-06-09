import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const SalonView = lazy(() => import('../../container/salon/salons/Index'));
const SalonAdd = lazy(() => import('../../container/salon/salons/Add'));
const SalonEdit = lazy(() => import('../../container/salon/salons/Edit'));

const SalonRequestView = lazy(() => import('../../container/salon/salonrequests/Index'));

const SalonReviewView = lazy(() => import('../../container/salon/salonreviews/Index'));
const SalonReviewEdit = lazy(() => import('../../container/salon/salonreviews/Edit'));

const SalonAvailView = lazy(() => import('../../container/salon/availibilityhours/Index'));
const SalonAvailAdd = lazy(() => import('../../container/salon/availibilityhours/Add'));
const SalonAvailEdit = lazy(() => import('../../container/salon/availibilityhours/Edit'));

const SalonAddressView = lazy(() => import('../../container/salon/addresses/Index'));
const SalonAddressAdd = lazy(() => import('../../container/salon/addresses/Add'));
const SalonAddressEdit = lazy(() => import('../../container/salon/addresses/Edit'));


const SalonRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/salon/salon-view`} component={SalonView} />
      <Route path={`${path}/salon/salon-add`} component={SalonAdd} />
      <Route exact path={`${path}/salon/edit/:id`} component={SalonEdit} />

      <Route path={`${path}/salon/request-view`} component={SalonRequestView} />

      <Route path={`${path}/salon/review-view`} component={SalonReviewView} />
      <Route exact path={`${path}/review/edit/:id`} component={SalonReviewEdit} />

      <Route path={`${path}/salon/availibility-hours-view`} component={SalonAvailView} />
      <Route path={`${path}/salon/availibility-hours-add`} component={SalonAvailAdd} />
      <Route exact path={`${path}/availibility-hours/edit/:id`} component={SalonAvailEdit} />

      <Route path={`${path}/salon/address-view`} component={SalonAddressView} />
      <Route path={`${path}/salon/address-add`} component={SalonAddressAdd} />
      <Route exact path={`${path}/address/edit/:id`} component={SalonAddressEdit} />
    </Switch>
  );
};

export default SalonRoute;
