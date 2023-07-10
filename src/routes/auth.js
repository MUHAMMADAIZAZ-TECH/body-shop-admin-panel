import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const NewPassword = lazy(() => import('../container/profile/authentication/overview/NewPassword'));
function NotFound() {
  return <Redirect to="/" />;
}

function FrontendRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/new-password" component={NewPassword} />
        <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/" component={Login} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
}

export default AuthLayout(FrontendRoutes);
