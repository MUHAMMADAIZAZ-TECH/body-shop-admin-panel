import React, { useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { ChangePassword, getMyprofile } from '../../redux/profile/profileSlice';


const AddNew = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: state.MyProfileStates.loading,
      MyProfileStates: state.MyProfileStates
    };
  });
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(ChangePassword({...values}));
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
 
  useEffect(()=>{
    dispatch(getMyprofile())
  },[dispatch])
  return (
    <>
      <PageHeader
        ghost
        title="My Profile"
      />
      <Main>
        <Row gutter={15} >
          <Col xs={24}>
            <AddUser>
            <Cards title='Change Password'>
            <Row justify="center">
            <Col xl={10} md={16} xs={24}>
            <div className="user-info-form">
            <BasicFormWrapper>
                <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
              <Form.Item
                label="Current Password"
                name="passwordCurrent"
                initialValue=''
                rules={[{ message: 'Please input your current password!', type: 'password' }]}
              >
                <Input placeholder="Enter current password" type='password'/>
              </Form.Item>

              <Form.Item name="newPassword" label="New Password"
               initialValue=''
               rules={[{ message: 'Please input your new password!', type: 'password' }]}>
                <Input placeholder="Enter new password" type='password' />
              </Form.Item>
              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button htmlType="submit" type="primary">
                  {isLoading?'loading': 'Save'}
                  </Button>
                </div>
              </Form.Item>
            </Form>
            </BasicFormWrapper>
            </div>
            </Col>
            </Row>
            </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddNew;
