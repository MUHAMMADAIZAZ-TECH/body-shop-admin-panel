import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const Config = lazy(() => import('../../container/settings/configs/Index'));
const CustomPagesView = lazy(() => import('../../container/settings/custompages/Index'));
const CustomPageAdd = lazy(()=>import('../../container/settings/custompages/Add'));
const CustomPageEdit = lazy(()=>import('../../container/settings/custompages/Edit'));

const ReservationFeeView = lazy(() => import('../../container/settings/reservationfee/Index'));
const ReservationFeeAdd = lazy(()=>import('../../container/settings/reservationfee/Add'));
const ReservationFeeEdit = lazy(()=>import('../../container/settings/reservationfee/Edit'));

const SettingsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/settings/config/view`} component={Config} />

      <Route path={`${path}/settings/custompages/view`} component={CustomPagesView} />
      <Route path={`${path}/settings/custompages/add`} component={CustomPageAdd} />
      <Route exact path={`${path}/settings/custompages/edit/:id`} component={CustomPageEdit} />

      <Route path={`${path}/settings/reservationfee/view`} component={ReservationFeeView} />
      <Route path={`${path}/settings/reservationfee/add`} component={ReservationFeeAdd} />
      <Route exact path={`${path}/settings/reservationfee/edit/:id`} component={ReservationFeeEdit} />
    </Switch>
  );
};

export default SettingsRoute;
