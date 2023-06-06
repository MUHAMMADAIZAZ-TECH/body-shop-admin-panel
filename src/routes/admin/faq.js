import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const FaqcategoriesView = lazy(() => import('../../container/faq-admin/faqcategories/Index'));
const FaqcategoriesAdd = lazy(() => import('../../container/faq-admin/faqcategories/Add'));
const FaqcategoriesEdit = lazy(() => import('../../container/faq-admin/faqcategories/Edit'));

const FaqsView = lazy(() => import('../../container/faq-admin/faqs/Index'));
const FaqsAdd = lazy(() => import('../../container/faq-admin/faqs/Add'));
const FaqsEdit = lazy(() => import('../../container/faq-admin/faqs/Edit'));
const FaqRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/faq-admin/faqcategories-view`} component={FaqcategoriesView} />
      <Route path={`${path}/faq-admin/faqcategories-add`} component={FaqcategoriesAdd} />
      <Route exact path={`${path}/faq/faqcategories-edit/:id`} component={FaqcategoriesEdit} />

      <Route path={`${path}/faq-admin/faqs-view`} component={FaqsView} />
      <Route path={`${path}/faq-admin/faqs-add`} component={FaqsAdd} />
      <Route exact path={`${path}/faq-admin/faqs-edit/:id`} component={FaqsEdit} />
    </Switch>
  );
};

export default FaqRoute;
