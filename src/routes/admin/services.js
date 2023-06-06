import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const ServicesListView = lazy(() => import('../../container/services/serviceslist/Index'));
const ServicesListAdd = lazy(() => import('../../container/services/serviceslist/Add'));
const ServicesListEdit = lazy(() => import('../../container/services/serviceslist/Edit'));

const ServicesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/services/services-list-view`} component={ServicesListView} />
      <Route path={`${path}/services/services-list-add`} component={ServicesListAdd} />
      <Route exact path={`${path}/services/edit/:id`} component={ServicesListEdit} />
    </Switch>
  );
};

export default ServicesRoute;
