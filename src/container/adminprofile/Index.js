import React, { useState,useEffect } from 'react';
import { Row, Col, Form, Input, Upload,message,Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { getMyprofile,updateMyProfile } from '../../redux/profile/profileApis';
import { uploadButton ,getBase64} from '../../components/utilities/utilities';

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
const AddNew = () => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  const { MyProfileStates} = useSelector((state) => {
    return {
      isLoading: state.MyProfileStates.loading,
      MyProfileStates: state.MyProfileStates
    };
  });
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(updateMyProfile({
        ...values,
        files:files[0]?.originFileObj,
        profile:MyProfileStates.MyProfile,
        remove: files.length === 0 
      }));
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
     
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    const fileList = newFileList?.map((file) => {
      return { ...file, status: 'done' };
    });
    console.log(fileList);
    setfiles(fileList);
  };
  useEffect(() => {
    if (MyProfileStates.MyProfile !== null) {
      form.setFieldsValue(MyProfileStates.MyProfile);
      if (MyProfileStates.MyProfile.photo!=='') {
        setfiles([{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: MyProfileStates.MyProfile.photo,
          }]);
      }
    }
  }, [form, MyProfileStates?.MyProfile]);
  const validateMobileNumber = (_, value) => {
    const phonePattern = /^\+[0-9]{1,}$/; // Pattern for phone numbers starting with a plus sign
    if (value && !phonePattern.test(value)) {
      return Promise.reject(new Error('Invalid mobile phone number'));
    }
    return Promise.resolve();
  };

  useEffect(()=>{
    dispatch(getMyprofile())
  },[])
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
            <Cards title='Personal Information'>
            <Row justify="center">
            <Col xl={10} md={16} xs={24}>
            <div className="user-info-form">
            <BasicFormWrapper>
                <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
              <Form.Item label="Photo"/>
              <Upload
                        listType="picture-card"
                        fileList={files}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        name="files"
                      >
                        {files.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                          alt="example"
                          style={{
                            width: '100%',
                          }}
                          src={previewImage}
                        />
                      </Modal>

              <Form.Item label="Name" name="fullName"  rules={[{ message: 'Please enter your name!' }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>

              <Form.Item name="mobile_number" label="Mobile Number"
                rules={[
                  { required: true, message: 'Mobile number is required!' },
                  { validator: validateMobileNumber }
                ]}>
                <Input placeholder="+440 2546 5236"/>
              </Form.Item>

              <Form.Item name="address" label="Address"  rules={[{ message: 'Please enter your address!' }]}>
                <Input placeholder="Enter your address" />
              </Form.Item>
             
              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button htmlType="submit" type="primary">
                   Save
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
