import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const Config = lazy(() => import('../../container/settings/configs/Index'));
const CustomPagesView = lazy(() => import('../../container/settings/custompages/Index'));
const CustomPageAdd = lazy(()=>import('../../container/settings/custompages/Add'));
const CustomPageEdit = lazy(()=>import('../../container/settings/custompages/Edit'));
const SettingsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/settings/config/view`} component={Config} />

      <Route path={`${path}/settings/custompages/view`} component={CustomPagesView} />
      <Route path={`${path}/settings/custompages/add`} component={CustomPageAdd} />
      <Route exact path={`${path}/settings/custompages/edit/:id`} component={CustomPageEdit} />
    </Switch>
  );
};

export default SettingsRoute;
