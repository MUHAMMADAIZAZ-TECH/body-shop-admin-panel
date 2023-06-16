import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const FaqsView = lazy(() => import('../../container/faq-admin/faqs/Index'));
const FaqsAdd = lazy(() => import('../../container/faq-admin/faqs/Add'));
const FaqsEdit = lazy(() => import('../../container/faq-admin/faqs/Edit'));
const FaqRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/faq-admin/faqs-view`} component={FaqsView} />
      <Route path={`${path}/faq-admin/faqs-add`} component={FaqsAdd} />
      <Route exact path={`${path}/faq-admin/faqs-edit/:id`} component={FaqsEdit} />
    </Switch>
  );
};

export default FaqRoute;
