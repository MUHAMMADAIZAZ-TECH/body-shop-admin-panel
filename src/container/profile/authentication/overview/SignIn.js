import React, { useState, useCallback } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Auth0Lock } from 'auth0-lock';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { auth0options } from '../../../../config/auth0';
import { UserLogin } from '../../../../redux/authentication/authenticationSlice';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("admin@example.com"); // State variable for username
  const [password, setPassword] = useState("12345678"); 
  const isLoading = useSelector((state) => state.authenticationStates.loading);
  const authStates = useSelector((state) => state.authenticationStates);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  console.log(authStates)
  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmit = useCallback(() => {
    dispatch(login());
    history.push('/admin');
  }, [history, dispatch]);
  const handleSubmit2 = useCallback(()=>{
  dispatch(UserLogin({
    username,
    password
  }));
  },[dispatch])
  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  lock.on('authenticated', authResult => {
    lock.getUserInfo(authResult.accessToken, error => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });
  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value); // Update the username state variable
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value); // Update the password state variable
  }, []);

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit2} layout="vertical">
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            initialValue="admin@example.com"
            label="Username or Email Address"
          >
            <Input value={username} onChange={handleUsernameChange} />
          </Form.Item>
          <Form.Item name="password" initialValue="12345678" label="Password">
            <Input.Password value={password} onChange={handlePasswordChange} placeholder="Password"  />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={state.checked}>
              Keep me logged in
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul>
          <div className="auth0-login">
            <Link to="#" onClick={() => lock.show()}>
              Sign In with Auth0
            </Link>
            <Link to="/fbSignIn">Sign In With Firebase</Link>
          </div>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
