import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const EarningsView = lazy(() => import('../../container/earnings/Index'));
const EarningsAdd = lazy(() => import('../../container/earnings/Add'));
const EarningsEdit = lazy(() => import('../../container/earnings/Edit'));

const EarningsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/earnings/earning-view`} component={EarningsView} />
      <Route path={`${path}/earnings/earning-add`} component={EarningsAdd} />
      <Route exact path={`${path}/earnings/earning/edit/:id`} component={EarningsEdit} />
    </Switch>
  );
};

export default EarningsRoute;
