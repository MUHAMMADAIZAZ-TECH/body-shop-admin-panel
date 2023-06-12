import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker,Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { axiosDataSingle } from '../../redux/crud/axios/actionCreator';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const Edit = ({ match }) => {
  const dispatch = useDispatch();

  const { crud, isLoading } = useSelector(state => {
    return {
      crud: state.SingleAxiosCrud.data,
      isLoading: state.AxiosCrud.loading,
      url: state.AxiosCrud.url,
      isFileLoading: state.AxiosCrud.fileLoading,
    };
  });
 
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(crud);
  }, [form, crud]);

  useEffect(() => {
    if (axiosDataSingle) {
      dispatch(axiosDataSingle(parseInt(match.params.id, 10)));
    }
  }, [dispatch, match.params.id]);


  return (
    <>
    <PageHeader
      buttons={[
        <Button className="btn-add_new" size="default" key="1" type="primary">
          <Link key="1" to="/admin/coupons/coupons-view">
            View All
          </Link>
        </Button>,
      ]}
      ghost
      title="Coupons | Coupons Management"
    />
    <Main>
      <Row gutter={15}>
        <Col xs={24}>
          <BasicFormWrapper>
            <Cards title="Update Coupon">
              <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form}>
                <Row gutter={30}>
                  <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="code" label="Code" rules={[{ required: true, message: 'Please enter code' }]}>
                      <Input placeholder="Enter Code" />
                    </Form.Item>
                    <Form.Item name="discounttype" initialValue="" label="Discount Type">
                        <Select style={{ width: '100%' }}>
                          <Option value="">Please Select</Option>
                          <Option value="bangladesh">Bangladesh</Option>
                          <Option value="india">India</Option>
                          <Option value="pakistan">Pakistan</Option>
                          <Option value="srilanka">Srilanka</Option>
                        </Select>
                      </Form.Item>
                    <Form.Item name="discount" label="Discount" rules={[{ required: true, message: 'Please enter discount' }]}>
                      <Input placeholder="Enter Color" type='number'/>
                    </Form.Item>
                  <Form.Item name="description" label="Description" >
                      <Input.TextArea rows={5} placeholder="Enter Description" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24} className="mb-25">
                    
                  <Form.Item name="services" label="Services" rules={[{ required: true, message: 'Please enter services' }]}>
                  <Select style={{ width: '100%' }}>
                          <Option value="">Please Select</Option>
                          <Option value="bangladesh">Bangladesh</Option>
                          <Option value="india">India</Option>
                          <Option value="pakistan">Pakistan</Option>
                          <Option value="srilanka">Srilanka</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="salon" label="Salon" rules={[{ required: true, message: 'Please enter salon' }]}>
                    <Select style={{ width: '100%' }}>
                          <Option value="">Please Select</Option>
                          <Option value="bangladesh">Bangladesh</Option>
                          <Option value="india">India</Option>
                          <Option value="pakistan">Pakistan</Option>
                          <Option value="srilanka">Srilanka</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter category' }]}>
                    <Select style={{ width: '100%' }}>
                          <Option value="">Please Select</Option>
                          <Option value="bangladesh">Bangladesh</Option>
                          <Option value="india">India</Option>
                          <Option value="pakistan">Pakistan</Option>
                          <Option value="srilanka">Srilanka</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="expireat" label="ExpireAt" rules={[{ required: true, message: 'Please enter expireAt' }]}>
                    <DatePicker style={{ width: '100%' }} format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="enabled" label="Enabled" >
                    <Checkbox defaultChecked>Enabled</Checkbox>
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
