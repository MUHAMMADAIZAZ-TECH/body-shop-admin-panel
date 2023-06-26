import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const AdminProfile = lazy(() => import('../../container/adminprofile/Index'));
const Changepassword = lazy(() => import('../../container/adminprofile/change-password'));
const AdminProfileRoute = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/profile/view`} component={AdminProfile} />
            <Route path={`${path}/profile/change-password`} component={Changepassword} />
        </Switch>
    );
};

export default AdminProfileRoute;
