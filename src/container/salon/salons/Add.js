import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Modal, Col, Form, Input, Select, Upload, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { createSalon } from '../../../redux/salon/salonSlice';

const { Option } = Select;
const { Dragger } = Upload;

const selectAfter = (
  <Select defaultValue="km" style={{ width: 70 }}>
    <Option value="km">km</Option>
    <Option value="m">m</Option>
  </Select>
);
const draggerprops = {
  maxCount:1,
  name: 'document',
  multiple: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddNew = () => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  // const [document, setdocument] = useState(null);
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(createSalon({ ...values, files }));
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
  const handleChange = ({ fileList: newFileList, }) => {
    const fileList  = newFileList?.map((file)=>{
      return{...file, status:'done'}
    })
    setfiles(fileList)
  };
  const uploadButton = (
    <div><PlusOutlined />
      <div style={{ marginTop: 8, }}>Upload</div>
    </div>
  );

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/admin/salon/salon-view">View All</Link>
          </Button>,
        ]}
        ghost
        title="Salons | Salons Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Create Salon">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                    <Upload
                        listType="picture-card"
                        fileList={files}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        name='files'
                      >
                        {files.length >= 5 ? null : uploadButton}
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
                      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                      <Form.Item name="description" label="Description" >
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                      <div className="sDash_uploader-list">
                      <Form.Item name="document" label="Document" rules={[{ required: true, message: 'Please select document' }]} >
                      <Dragger {...draggerprops}>
                          <p className="ant-upload-text">Drop files here to upload</p>
                        </Dragger>
                      </Form.Item>
                      </div>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">

                      <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: 'Please enter a phone number' }]}>
                        <Input placeholder="Last Name" />
                      </Form.Item>
                      <Form.Item name="mobile_number" label="Mobile Number" rules={[{ required: true, message: 'Please enter a mobile number' }]}>
                        <Input placeholder="Enter Mobile Number" />
                      </Form.Item>
                      <Form.Item name="address" label="Address" initialValue="" rules={[{ required: true, message: 'Please enter address' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="availability_range" label="Availability Range" rules={[{ required: true, message: 'Please enter availibilty range' }]} >
                      <Input addonAfter={selectAfter} defaultValue={0} type='number'/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="record-form-actions text-right">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'baseline'
                    }}>
                      <Button
                        className="btn-cancel"
                        size="large"
                        onClick={() => {
                          return form.resetFields();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button size="default" htmlType="Save" type="primary">
                        {/* {isLoading ? 'Loading...' : 'Submit'} */}
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form>
              </Cards>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddNew;
