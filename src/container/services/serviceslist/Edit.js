import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Upload, Modal, Checkbox, TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getService, updateService } from '../../../redux/services/servicesSlice';
import { getSalonsList } from '../../../redux/salon/salonSlice';
import { getCategories } from '../../../redux/categories/categoriesSlice';
import { getBase64, uploadButton } from '../../../components/utilities/utilities';

const { Option } = Select;

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const [is_available, setis_available] = useState(false);
  const [enable_customer_booking, setenable_customer_booking] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { isLoading, servicesStates, salonState, categoryState } = useSelector((state) => {
    return {
      isLoading: state.servicesStates.loading,
      servicesStates: state.servicesStates,
      salonState: state.salonStates,
      categoryState: state.categoryStates,
    };
  });
  console.log(servicesStates);
  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  const [totalPages, setTotalPages] = useState(0); 
  console.log(totalPages);
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      console.log(values, files[0].originFileObj, is_available);
      dispatch(
        updateService({
          id: match.params.id,
          ...values,
          duration: values.duration.format('HH:mm:ss'),
          file: files[0].originFileObj,
          is_available,
          enable_customer_booking,
        }),
      );
      // form.resetFields();
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

  useEffect(() => {
    if (servicesStates.service !== null) {
      form.setFieldsValue(servicesStates.service);
      if (servicesStates.service.duration) {
        const durationMoment = moment.duration(servicesStates.service.duration);
        const durationAsMoment = moment.utc().startOf('day').add(durationMoment);
        form.setFieldsValue({ duration: durationAsMoment });
      }
      if (servicesStates.service.image !== null || servicesStates.service.image !== '') {
        setfiles([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: servicesStates.service.image,
          },
        ]);
      }
      if (servicesStates.service.is_available === 1) {
        setis_available(true);
      }
      if (servicesStates.service.enable_customer_booking === 1) {
        setenable_customer_booking(true);
      }
    }
  }, [form, servicesStates.service]);
  useEffect(() => {
    dispatch(getService(match.params.id));
    dispatch(getSalonsList({
      currentPage:1,
      pageSize:10,
      setTotalPages
    }));
    dispatch(getCategories());
  }, [dispatch, match.params.id]);
  console.log(is_available);
  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/admin/services/services-list-view">View All</Link>
          </Button>,
        ]}
        ghost
        title="Services | Services Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Update Service">
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
                      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                      <Form.Item
                        name="salon_id"
                        label="Salon"
                        rules={[{ required: true, message: 'Please select salon' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          {salonState.salons &&
                            salonState.salons.length > 0 &&
                            salonState.salons?.map((salon) => <Option value={salon.id}>{salon.name}</Option>)}
                        </Select>
                      </Form.Item>

                      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                        <Input placeholder="Enter Price" type="number" addonAfter="$" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="category_id"
                        label="Category"
                        initialValue=""
                        rules={[{ required: true, message: 'Please enter Category' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          {categoryState.categories &&
                            categoryState.categories.length > 0 &&
                            categoryState.categories?.map((category) => (
                              <Option value={category.id}>{category.name}</Option>
                            ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{ required: true, message: 'Please select duration' }]}
                      >
                        <TimePicker
                          style={{ marginRight: '10px' }}
                          className="sDash_fullwidth-select"
                          format="HH:mm:ss"
                          onChange={(time) => {
                            form.setFieldsValue({ duration: time });
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="description" label="Description">
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                      <div style={{ display: 'flex' }}>
                        <Form.Item name="is_available" valuePropName="checked">
                          <Checkbox
                            value={is_available}
                            defaultChecked={servicesStates?.service?.is_available === 1}
                            name="is_available"
                            onChange={(e) => setis_available(e.target.checked)}
                          >
                            Available
                          </Checkbox>
                        </Form.Item>
                        <Form.Item name="enable_customer_booking" valuePropName="checked">
                          <Checkbox
                            value={enable_customer_booking}
                            defaultChecked={servicesStates?.service?.enable_customer_booking === 1}
                            name="enable_customer_booking"
                            onChange={(e) => setenable_customer_booking(e.target.checked)}
                          >
                            Enabled
                          </Checkbox>
                        </Form.Item>
                      </div>
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

Edit.propTypes = {
  match: PropTypes.object,
};

export default Edit;
