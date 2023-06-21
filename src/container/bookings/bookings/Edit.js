import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getBooking, updateBooking } from '../../../redux/bookings/bookingSlice';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const { isLoading, bookingStates } = useSelector((state) => {
    return {
      isLoading: state.bookingStates.loading,
      bookingStates: state.bookingStates,
    };
  });

  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(
        updateBooking({
          id: match.params.id,
          ...values.booking_status,
          // booking_date: values.booking_date.format('YYYY/MM/DD'),
          // appointmentDate: values.appointmentDate.format('YYYY/MM/DD'),
          // startTime: values.startTime.format('HH:mm:ss'),
        }),
      );
      console.log(values);
    } catch (error) {
      console.log(values);
      console.log('Validation error:', error);
    }
    // form.resetFields();
  };
  console.log(bookingStates.Booking);
  useEffect(() => {
    if (bookingStates.Booking !== null) {
      form.setFieldsValue(bookingStates.Booking);
      if (bookingStates.Booking.booking_date) {
        form.setFieldsValue({ booking_date: moment(bookingStates.Booking.booking_date) });
      }
      if (bookingStates.Booking.appointmentDate) {
        form.setFieldsValue({ appointmentDate: moment(bookingStates.Booking.appointmentDate) });
      }
      if (bookingStates.Booking.startTime) {
        const durationMoment = moment.duration(bookingStates.Booking.startTime);
        const durationAsMoment = moment.utc().startOf('day').add(durationMoment);
        form.setFieldsValue({ startTime: durationAsMoment });
      }
    }
  }, [form, bookingStates?.Booking]);

  useEffect(() => {
    dispatch(getBooking(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/admin/bookings/bookings-view">View All</Link>
          </Button>,
        ]}
        ghost
        title="Bookings | Bookings Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Update Booking">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="booking_status"
                        label="Booking Status"
                        initialValue=""
                        rules={[{ required: true, message: 'Please select booking status' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="pending">Pending</Option>
                          <Option value="inProgress">InProgress</Option>
                          <Option value="completed">Completed</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="salon_address"
                        label="Address"
                        initialValue=""
                        rules={[{ required: true, message: 'Please select address' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select" disabled>
                          <Option value="">Please Select</Option>
                          <Option value=" salon_address1">salon_address1</Option>
                          <Option value=" salon_address2">salon_address2</Option>
                          <Option value=" salon_address3">salon_address3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="is_paid"
                        label="Payment Status"
                        initialValue=""
                        rules={[{ required: true, message: 'Please enter Category' }]}
                      >
                        <Select size="large" className="sDash_fullwidth-select" disabled>
                          <Option value="">Please Select</Option>
                          <Option value={1}>Paid</Option>
                          <Option value={0}>UnPaid</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="hints" label="Hints and Notes">
                        <Input.TextArea rows={5} placeholder="Enter Hints and Notes" disabled />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item name="booking_date" label="Booking At">
                        <DatePicker style={{ width: '100%' }} format={dateFormat} disabled />
                      </Form.Item>
                      <Form.Item name="appointmentDate" label="Appointment Date">
                        <DatePicker style={{ width: '100%' }} format={dateFormat} disabled />
                      </Form.Item>
                      <Form.Item name="startTime" label="Start At">
                        <TimePicker
                          style={{ marginRight: '10px' }}
                          className="sDash_fullwidth-select"
                          format="HH:mm:ss"
                          onChange={(time) => {
                            form.setFieldsValue({ startTime: time });
                          }}
                          disabled
                        />
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

Edit.propTypes = {
  match: PropTypes.object,
};

export default Edit;
