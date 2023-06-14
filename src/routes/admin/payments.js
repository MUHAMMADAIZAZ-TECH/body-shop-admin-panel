import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const PaymentlistView = lazy(() => import('../../container/payment/paymentlist/Index'));
const PaymentRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/payment/paymentlist-view`} component={PaymentlistView} />
    </Switch>
  );
};

export default PaymentRoutes;
