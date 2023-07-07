import React, { useState } from 'react';
import { Row, Modal, Col, Form, Input, Select, Upload, TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { createSalon } from '../../../redux/salon/salonApis';
import { getBase64, draggerprops, uploadButton } from '../../../components/utilities/utilities';

const { Option } = Select;
const { Dragger } = Upload;

const AddNew = () => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: state.salonStates.loading,
    };
  });
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(createSalon({
        ...values,
        closing_time: values.closing_time.format('HH:mm A'),
        opening_time: values.opening_time.format('HH:mm A'),
        files
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
    setfiles(fileList);
  };

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
                        name="files"
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
                      <Form.Item name="description" label="Description">
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                      <div className="sDash_uploader-list">
                        <Form.Item
                          name="document"
                          label="Document"
                          rules={[{ required: true, message: 'Please select document' }]}
                        >
                          <Dragger {...draggerprops}>
                            <p className="ant-upload-text">Drop files here to upload</p>
                          </Dragger>
                        </Form.Item>
                      </div>
                    </Col>

                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="address"
                        label="Address"
                        initialValue=""
                        rules={[{ required: true, message: 'Please enter address' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select" disabled>
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="availability_range"
                        label="Availability Range"
                        rules={[{ required: true, message: 'Please enter availibilty range' }]}
                      >
                        <Input addonAfter="km" defaultValue={0} type="number" />
                      </Form.Item>
                      <Row gutter={30}>
                        <Col sm={12} xs={24} className="mb-25">
                          <Form.Item
                            name="phone_number"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please enter a phone number' }]}
                          >
                            <Input placeholder="Last Name" type='number' />
                          </Form.Item>
                        </Col>
                        <Col sm={12} xs={24} className="mb-25">
                          <Form.Item
                            name="mobile_number"
                            label="Mobile Number"
                            rules={[{ required: true, message: 'Please enter a mobile number' }]}
                          >
                            <Input placeholder="Enter Mobile Number" type='number' />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="Availibility hours" />
                      <Form.Item
                        name="weekday"
                        label="Day"
                        initialValue=""
                        rules={[{ required: true, message: 'Please select Day' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="Sunday">Sunday</Option>
                          <Option value="Monday">Monday</Option>
                          <Option value="Tuesday">Tuesday</Option>
                          <Option value="Wednesday">Wednesday</Option>
                          <Option value="Thursday">Thursday</Option>
                          <Option value="Friday">Friday</Option>
                          <Option value="Saturday">Saturday</Option>
                        </Select>
                      </Form.Item>
                      <Row gutter={30}>
                        <Col sm={12} xs={24} className="mb-25">
                          <Form.Item
                            name="opening_time"
                            label="Start At"
                            rules={[{ required: true, message: 'Please select start at' }]}
                          >
                            <TimePicker
                              style={{ marginRight: '10px' }}
                              className="sDash_fullwidth-select"
                              use12Hours 
                              format="h:mm A"
                              onChange={(time) => {
                                form.setFieldsValue({ opening_time: time });
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col sm={12} xs={24} className="mb-25">
                          <Form.Item
                            name="closing_time"
                            label="End At"
                            rules={[{ required: true, message: 'Please select end at' }]}
                          >
                            <TimePicker
                              style={{ marginRight: '10px' }}
                              className="sDash_fullwidth-select"
                              use12Hours 
                              format="h:mm A"
                              onChange={(time) => {
                                form.setFieldsValue({ closing_time: time });
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="record-form-actions text-right">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'baseline',
                      }}
                    >
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
                        {isLoading ? 'Loading...' : 'Submit'}
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
