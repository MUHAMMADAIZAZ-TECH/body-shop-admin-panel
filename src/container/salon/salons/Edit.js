import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, Select, Upload, Modal, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getSalon, updateSalon } from '../../../redux/salon/salonApis';
import { getBase64 } from '../../../components/utilities/utilities';

const { Option } = Select;

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { salon, isLoading } = useSelector((state) => {
    return {
      salon: state.salonStates.salon,
      isLoading: state.salonStates.loading,
    };
  });
  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  const [removeIds, setremoveIds] = useState([]);

  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      console.log(values);
      dispatch(updateSalon({ id: match.params.id, ...values, files, deletedImageIds: removeIds }));
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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleRemove = (removedFile) => {
    const removedImageId = removedFile.uid;
    const uniqueArray = [...new Set([...removeIds, removedImageId])];
    localStorage.setItem('removeitemsid', JSON.stringify(uniqueArray));
    setremoveIds(uniqueArray);
  };
  useEffect(() => {
    form.setFieldsValue(salon);
    if (salon !== null) {
      if (salon?.images?.length > 0) {
        const array = salon?.images?.map((image) => {
          return {
            uid: image.image_id,
            name: 'image.png',
            status: 'done',
            url: image.image_url,
          };
        });
        setfiles(array);
      }
      if (salon.isApproved === 1) {
        form.setFieldsValue({ isApproved: true });
      }
    }
  }, [form, salon]);
  console.log(salon);
  useEffect(() => {
    dispatch(getSalon(parseInt(match.params.id, 10)));
  }, [dispatch, match.params.id]);

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/salon/salon-view">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Salons | Salons Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Update Salon">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                      <Upload
                        listType="picture-card"
                        fileList={files}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        onRemove={handleRemove}
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
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter a phone number' }]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                      <Form.Item
                        name="mobile_number"
                        label="Mobile Number"
                        rules={[{ required: true, message: 'Please enter a mobile number' }]}
                      >
                        <Input placeholder="Enter Mobile Number" />
                      </Form.Item>
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
                        <Input placeholder="Enter Availability Range" addonAfter='km'/>
                      </Form.Item>
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
                      <div style={{ marginRight: 30 }}>
                        <Form.Item name="isApproved">
                          <Checkbox
                            name="isApproved"
                            defaultChecked={salon.isApproved === 1}
                            onChange={(e) => {
                              if (e.target.checked) {
                                form.setFieldsValue({ isApproved: 1 });
                              } else {
                                form.setFieldsValue({ isApproved: 0 });
                              }
                            }}
                          >
                            Approved
                          </Checkbox>
                        </Form.Item>
                      </div>
                      <div style={{ marginRight: 30 }}>
                        <Form.Item name="isActive">
                          <Checkbox
                            defaultChecked={salon.isActive === 1}
                            onChange={(e) => {
                              if (e.target.checked) {
                                form.setFieldsValue({ isActive: 1 });
                              } else {
                                form.setFieldsValue({ isActive: 0 });
                              }
                            }}
                          >
                            Available
                          </Checkbox>
                        </Form.Item>
                      </div>
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

Edit.propTypes = {
  match: PropTypes.object,
};

export default Edit;
