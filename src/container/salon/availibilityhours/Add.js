import React, { useEffect } from 'react';
import { Row, Col, Form,TimePicker,Select } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { createAvailibilityHours, getSalons } from '../../../redux/salon/salonSlice';
// import { getSalon } from '../../../redux/salon/salonSlice';

const { Option } = Select;
const AddNew = ({ match }) => {
  const dispatch = useDispatch();
  const {salonState,isLoading } = useSelector(state => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.loading
    };
  });
  const [form] = Form.useForm();
  // const [document, setdocument] = useState(null);
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(createAvailibilityHours({ 
        salonId:values.salon_id,
        closingTime:values.closingTime.format('HH:mm:ss'),
        openingTime:values.openingTime.format('HH:mm:ss'),
        weekday:values.weekday 
      }));
        form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
   
  };
  useEffect(() => {
    dispatch(getSalons())
  }, [dispatch, match.params.id]);

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/salon/availibility-hours-view">
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
                    <Form.Item name="weekday" label="Day" initialValue="" rules={[{ required: true, message: 'Please select Day' }]} >
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
                      <Form.Item name="salon_id" label="Salon" initialValue="" rules={[{ required: true, message: 'Please select salon' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          {salonState.approvedSalons && salonState.approvedSalons.length>0 && salonState.approvedSalons?.map((salon)=><Option value={salon.id}>{salon.name}</Option>) }
                        </Select>
                      </Form.Item>
                      </Col>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="openingTime" label="Start At" rules={[{ required: true, message: 'Please select start at' }]}>
                      <TimePicker style={{ marginRight: '10px' }} className="sDash_fullwidth-select"  
                         onChange={(time) => {
                          form.setFieldsValue({ openingTime: time });
                        }}
                      />
                      </Form.Item>   
                      <Form.Item name="closingTime" label="End At" rules={[{ required: true, message: 'Please select end at' }]}>
                      <TimePicker style={{ marginRight: '10px' }} className="sDash_fullwidth-select"  
                         onChange={(time) => {
                          form.setFieldsValue({ closingTime: time });
                        }}
                      />
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

AddNew.propTypes = {
  match: PropTypes.object,
};

export default AddNew;
