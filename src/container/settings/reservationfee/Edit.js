import React, { useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getReservationFeesById, updateReservationFee } from '../../../redux/settings/settingsApis';

const Edit = ({ match }) => {
  const dispatch = useDispatch();

  const { isLoading, settingStates } = useSelector((state) => {
    return {
      isLoading: state.settingStates.loading,
      settingStates: state.settingStates,
    };
  });
  const [form] = Form.useForm();

  useEffect(() => {
    if (settingStates.reservationfee !== null) {
      form.setFieldsValue(settingStates.reservationfee);
    }
  }, [form, settingStates?.reservationfee]);
  console.log(settingStates.reservationfee);
  useEffect(() => {
    dispatch(getReservationFeesById(parseInt(match.params.id, 10)));
  }, [dispatch, match.params.id]);

  const handleSubmit = (values) => dispatch(updateReservationFee({ id: match.params.id, ...values }));

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/settings/reservationfee/view">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Reservation Fees | Reservation Fees Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Update Reservation Fee">
              <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="country"
                        label="Country"
                        initialValue=""
                        // rules={[{ required: true, message: 'Please enter country' }]}
                      >
                        <Input placeholder="Enter country" disabled/>
                      </Form.Item>
                      <Form.Item
                        name="symbol"
                        label="Symbol"
                        initialValue=""
                        // rules={[{ required: true, message: 'Please enter country' }]}
                      >
                        <Input placeholder="Enter symbol" disabled/>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="currency"
                        label="Currency"
                        // rules={[{ required: true, message: 'Please select content' }]}
                      >
                        <Input placeholder="Enter currency" disabled/>
                      </Form.Item>
                      <Form.Item
                        name="amount"
                        label="Amount"
                        // rules={[{ required: true, message: 'Please select content' }]}
                      >
                        <Input placeholder="Enter amount" type='number'/>
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
