import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import firebase from '../../../../config/database/firebase';

function ForgotPassword() {
  const history = useHistory();
  const [form] = Form.useForm();
  const handleforgotpassword = (values) =>{
    const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    firebase.auth().signInWithPhoneNumber(values,recaptcha).then(function(e){
      const code = prompt('Enter the OTP','');
      if(code==null) return;
      e.confirm(code).then(function(result){
        console.log(result.user);
        console.log("Number verified");
        history.push('/new-password')
      }).catch((error)=>{
        console.log(error);
      })
    })
  }
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      localStorage.setItem('mobileNo',JSON.stringify(values.phone_no))
      handleforgotpassword(values.phone_no)
    } catch (error) {
      console.log('Validation error:', error);
    }
   
  };
  const validateMobileNumber = (_, value) => {
    const phonePattern = /^\+[0-9]{1,}$/; // Pattern for phone numbers starting with a plus sign
    if (value && !phonePattern.test(value)) {
      return Promise.reject(new Error('Invalid mobile phone number'));
    }
    return Promise.resolve();
  };
  return (
    <AuthWrapper>
      <div id="recaptcha" className='captcha'/>
      <div className="auth-contents">
        <Form name="forgotPass" onFinish={handleSubmit} form={form} layout="vertical">
          <Heading as="h3">Forgot Password?</Heading>
          <p className="forgot-text">
            Enter your phone no you used when you joined and we’ll 
            send you OTP to reset your password.
          </p>
          <Form.Item
            label="Phone No"
            name="phone_no"
            rules={[
              { required: true, message: 'Mobile number is required!' },
              { validator: validateMobileNumber }
            ]}
          >
            <Input placeholder="+440 2546 5236"/>
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large" id="recaptcha">
              Send
            </Button>
          </Form.Item>
          <p className="return-text">
            Return to <NavLink to="/">Sign In</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default ForgotPassword;
