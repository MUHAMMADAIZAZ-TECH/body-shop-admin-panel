import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const CouponsView = lazy(() => import('../../container/coupons/Index'));
const CouponsAdd = lazy(() => import('../../container/coupons/Add'));
const CouponsEdit = lazy(() => import('../../container/coupons/Edit'));

const CouponRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/coupons/coupons-view`} component={CouponsView} />
      <Route path={`${path}/coupons/coupons-add`} component={CouponsAdd} />
      <Route exact path={`${path}/coupons/edit/:id`} component={CouponsEdit} />
    </Switch>
  );
};

export default CouponRoute;
