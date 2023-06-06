import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const CategoryView = lazy(() => import('../../container/categories/Index'));
const CategoryAdd = lazy(() => import('../../container/categories/Add'));
const CategoryEdit = lazy(() => import('../../container/categories/Edit'));

const CategoriesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/categories/category-view`} component={CategoryView} />
      <Route path={`${path}/categories/category-add`} component={CategoryAdd} />
      <Route exact path={`${path}/categories/edit/:id`} component={CategoryEdit} />
    </Switch>
  );
};

export default CategoriesRoute;
