import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const PaymentlistView = lazy(() => import('../../container/payment/paymentlist/Index'));
const PaymentlistAdd = lazy(() => import('../../container/payment/paymentlist/Add'));
const PaymentlistEdit = lazy(() => import('../../container/payment/paymentlist/Edit'));

const PaymentmethodView = lazy(() => import('../../container/payment/paymentmethod/Index'));
const PaymentmethodAdd = lazy(() => import('../../container/payment/paymentmethod/Add'));
const PaymentmethodEdit = lazy(() => import('../../container/payment/paymentmethod/Edit'));

const PaymentstatusView = lazy(() => import('../../container/payment/paymentstatus/Index'));
const PaymentstatusAdd = lazy(() => import('../../container/payment/paymentstatus/Add'));
const PaymentstatusEdit = lazy(() => import('../../container/payment/paymentstatus/Edit'));

const PaymentRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/payment/paymentlist-view`} component={PaymentlistView} />
      <Route path={`${path}/payment/paymentlist-add`} component={PaymentlistAdd} />
      <Route exact path={`${path}/payment/paymentlist/edit/:id`} component={PaymentlistEdit} />

      <Route path={`${path}/payment/paymentmethod-view`} component={PaymentmethodView} />
      <Route path={`${path}/payment/paymentmethod-add`} component={PaymentmethodAdd} />
      <Route exact path={`${path}/payment/paymentmethod/edit/:id`} component={PaymentmethodEdit} />

      <Route path={`${path}/payment/paymentstatus-view`} component={PaymentstatusView} />
      <Route path={`${path}/payment/paymentstatus-add`} component={PaymentstatusAdd} />
      <Route exact path={`${path}/payment/paymentstatus/edit/:id`} component={PaymentstatusEdit} />

    </Switch>
  );
};

export default PaymentRoutes;
