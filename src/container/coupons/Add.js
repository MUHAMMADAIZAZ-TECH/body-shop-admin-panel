import React, { useEffect,useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { getSalonsList } from '../../redux/salon/salonSlice';
import { createCoupon } from '../../redux/coupons/couponSlice';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const AddNew = () => {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0); 
  const { isLoading, salonState } = useSelector((state) => {
    return {
      isLoading: state.salonStates.loading,
      salonState: state.salonStates,
    };
  });
  console.log(totalPages);
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(
        createCoupon({
          ...values,
          created_by: 1,
          start_date: values.start_date.format('YYYY/MM/DD'),
          end_date: values.end_date.format('YYYY/MM/DD'),
        }),
      );
      form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  useEffect(() => {
    dispatch(getSalonsList({
      currentPage:1,
      pageSize:10,
      setTotalPages
    }));
  }, [dispatch]);

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
              <Cards title="Add Coupon">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item name="code" label="Code" rules={[{ required: true, message: 'Please enter code' }]}>
                        <Input placeholder="Enter Code" />
                      </Form.Item>
                      <Form.Item name="discount_type" initialValue="" label="Discount Type">
                        <Select style={{ width: '100%' }}>
                          <Option value="">Please Select</Option>
                          <Option value="percentage">Percentage</Option>
                          <Option value="fixed">Fixed</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="discount_value"
                        label="Discount"
                        rules={[{ required: true, message: 'Please enter discount' }]}
                      >
                        <Input placeholder="Enter discount" type="number" />
                      </Form.Item>
                      <Form.Item
                        name="max_redemptions"
                        label="Max Redeem"
                        rules={[{ required: true, message: 'Please enter max redeem' }]}
                      >
                        <Input placeholder="Enter discount" type="number" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="salon_id"
                        label="Salon"
                        initialValue=""
                        rules={[{ required: true, message: 'Please select salon' }]}
                      >
                        <Select style={{ width: '100%' }}>
                          <Option value="">Please Select</Option>
                          {salonState.salons &&
                            salonState.salons.length > 0 &&
                            salonState.salons?.map((salon) => <Option value={salon.id}>{salon.name}</Option>)}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="start_date"
                        label="Start Date"
                        rules={[{ required: true, message: 'Please select start date' }]}
                      >
                        <DatePicker style={{ width: '100%' }} format={dateFormat} />
                      </Form.Item>
                      <Form.Item
                        name="end_date"
                        label="End Date"
                        rules={[{ required: true, message: 'Please select end date' }]}
                      >
                        <DatePicker style={{ width: '100%' }} format={dateFormat} />
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
