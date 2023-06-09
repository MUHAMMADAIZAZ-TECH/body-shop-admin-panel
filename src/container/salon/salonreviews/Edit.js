import React, { useEffect } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getsalonReview } from '../../../redux/salon/salonSlice';
// import { getSalon } from '../../../redux/salon/salonSlice';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const { salon, isLoading} = useSelector(state => {
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
    dispatch(getsalonReview(parseInt(match.params.id,10)))
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
        title="Salon Reviews | Salon Reviews Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Update Salon Review">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item name="description" label="Description" >
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item name="availability_range" label="Availability Range" rules={[{ required: true, message: 'Please enter availibilty range' }]} >
                        <Input placeholder="Enter Availability Range" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="record-form-actions text-right">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'baseline'
                    }}>
                      {/* <div style={{ marginRight: 30 }}>
                      <Form.Item name="isApproved" >
                      <Checkbox onChange={onChange}>Approved</Checkbox>
                      </Form.Item>
                      </div>
                      <div style={{ marginRight: 30 }}>
                      <Form.Item name="isActive" >
                      <Checkbox onChange={onChange}>Available</Checkbox>
                      </Form.Item>
                      </div> */}
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
