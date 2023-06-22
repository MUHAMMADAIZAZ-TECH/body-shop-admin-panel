import React, { lazy } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

const AdminProfile = lazy(() => import('../../container/adminprofile/Index'));

const AdminProfileRoute = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/profile/view`} component={AdminProfile} />
        </Switch>
    );
};

export default AdminProfileRoute;
