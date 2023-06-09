import React, { useEffect } from 'react';
import { Row, Col, Form,TimePicker,Select,Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getsalonReview } from '../../../redux/salon/salonSlice';
// import { getSalon } from '../../../redux/salon/salonSlice';

const { Option } = Select;
const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const { salon, isLoading } = useSelector(state => {
    return {
      salon: state.salonStates.salon,
      isLoading: state.AxiosCrud.loading,
      url: state.AxiosCrud.url,
      salonState: state.salonStates
    };
  });
  const [form] = Form.useForm();
  // const [document, setdocument] = useState(null);
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      // dispatch(createSalon({ ...values, files }));
      console.log(values)
    } catch (error) {
      console.log('Validation error:', error);
    }
    // form.resetFields();
  };

  // const onChange = (date, value) => {
  //   console.log(value)
  // };

  useEffect(() => {
    // form.setFieldsValue(salon);
    console.log(salon)
  }, [form, salon]);
  useEffect(() => {
    dispatch(getsalonReview(parseInt(match.params.id, 10)))
  }, [dispatch, match.params.id]);

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/crud/axios-view">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Availability Hours | Availability Hours Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Add Availibility Hours">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="address" label="Day" initialValue="" rules={[{ required: true, message: 'Please select address' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="description" label="Availibilty Hours" >
                      <TimePicker.RangePicker className="sDash_fullwidth-select" use12Hours style={{ marginRight: '10px' }}/>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="address" label="Salon" initialValue="" rules={[{ required: true, message: 'Please select address' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="name" label="Data" rules={[{ required: true, message: 'Please enter a name' }]}>
                        <Input placeholder="Enter Data" />
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
