import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { getCoupon, updateCoupon } from '../../redux/coupons/couponSlice';
import { getSalons } from '../../redux/salon/salonSlice';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const Edit = ({ match }) => {
  const dispatch = useDispatch();

  const {  isLoading,salonState,couponStates } = useSelector(state => {
    return {
      isLoading: state.couponStates.loading,
      salonState: state.salonStates,
      couponStates:state.couponStates
    };
  });
 
  const [form] = Form.useForm();
  useEffect(() => {
    if(couponStates.coupon!==null){
      form.setFieldsValue(couponStates.coupon);
      if (couponStates.coupon.end_date && couponStates.coupon.start_date  ) {
        form.setFieldsValue({ end_date: moment(couponStates.coupon.end_date) });
        form.setFieldsValue({ start_date: moment(couponStates.coupon.start_date) });
      }
    }
  }, [form, couponStates.coupon]);
  const handleSubmit = async values => {
    console.log(values)
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(updateCoupon({
         ...values,
        id:match.params.id,
        created_by:1,
        start_date:values.start_date.format("YYYY/MM/DD"),
        end_date:values.end_date.format("YYYY/MM/DD") }));
        form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  console.log(couponStates.coupon)
  useEffect(() => {
    dispatch(getCoupon(parseInt(match.params.id, 10)));
    dispatch(getSalons())
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
                      <Form.Item name="discount_value" label="Discount" rules={[{ required: true, message: 'Please enter discount' }]}>
                        <Input placeholder="Enter discount" type='number'/>
                      </Form.Item>
                      <Form.Item name="max_redemptions" label="Max Redeem" rules={[{ required: true, message: 'Please enter max redeem' }]}>
                        <Input placeholder="Enter discount" type='number'/>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item name="salon_id" label="Salon" initialValue="" rules={[{ required: true, message: 'Please select salon' }]}>
                      <Select style={{ width: '100%' }}>
                            <Option value="">Please Select</Option>
                            {salonState.approvedSalons && salonState.approvedSalons.length>0 && salonState.approvedSalons?.map((salon)=><Option value={salon.id}>{salon.name}</Option>) }
                          </Select>
                      </Form.Item>
                      <Form.Item name="start_date" label="Start Date" rules={[{ required: true, message: 'Please select start date' }]}>
                      <DatePicker style={{ width: '100%' }} format={dateFormat} />
                      </Form.Item>
                      <Form.Item name="end_date" label="End Date" rules={[{ required: true, message: 'Please select end date' }]}>
                      <DatePicker style={{ width: '100%' }} format={dateFormat} />
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
