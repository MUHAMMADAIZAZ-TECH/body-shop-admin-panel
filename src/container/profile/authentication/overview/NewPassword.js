import React ,{ useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { ForgotPassword } from '../../../../redux/authentication/authenticationSlice';
import Heading from '../../../../components/heading/heading';

function NewPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authStates } = useSelector((state) => {
    return {
      authStates: state.authenticationStates,
    };
  });
  console.log(authStates);
  const handleSubmit = (values) => {
    dispatch(ForgotPassword({
        ...values,
        mobile_number: JSON.parse(localStorage.getItem('mobileNo'))
    }))
  };
  useEffect(()=>{
    if(authStates.success===true){
      history.push('/')
      localStorage.removeItem('mobileNo')
    }
  },[authStates.success])
  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">Set Your Password</Heading>
          {/* <p className="forgot-text">
            Enter your phone no you used when you joined and we’ll 
            send you OTP to reset your password.
          </p> */}
          <Form.Item
            label="New Password"
            name="newPassword"
          >
            <Input placeholder="Enter password" maxLength={32} minLength={8}/>
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large" id="recaptcha">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default NewPassword;
