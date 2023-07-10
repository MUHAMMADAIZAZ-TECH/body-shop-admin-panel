import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import { UserLogin } from '../../../../redux/authentication/authApis';

function SignIn() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(''); // State variable for username
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.authenticationStates.loading);
  // const authStates = useSelector((state) => state.authenticationStates);
  const [form] = Form.useForm();
 
  const handleSubmit2 = async () => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(
        UserLogin({
          username,
          password,
        }),
      );
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
 
  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value); // Update the username state variable
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value); // Update the password state variable
  }, []);

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit2} layout="vertical">
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please Enter Your Email!', required: true }]}
            initialValue={username}
            label="Email Address"
          >
            <Input value={username} onChange={handleUsernameChange} placeholder='Email Address' type='email'/>
          </Form.Item>
          <Form.Item name="password"
           rules={[{ message: 'Please Enter Your Password!', required: true }]}
           initialValue={password} 
           label="Password">
            <Input.Password value={password} onChange={handlePasswordChange} placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
