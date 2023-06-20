import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getSalonReview, updateSalonReview } from '../../../redux/salon/salonSlice';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const { salonState,isLoading } = useSelector(state => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.loading
    };
  });
  const [form] = Form.useForm();
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(updateSalonReview({id:match.params.id,salonId:salonState.salonreview.salon_id, ...values}));
      // form.resetFields();
      console.log(values)
    } catch (error) {
      console.log('Validation error:', error);
    }
   
  };
  console.log(salonState.salonreview)
  useEffect(() => {
    if(salonState.salonreview!==null){
      form.setFieldsValue(salonState.salonreview);
    }
  }, [form, salonState?.salonreview]);
  useEffect(() => {
    dispatch(getSalonReview(parseInt(match.params.id,10)))
  }, [dispatch, match.params.id]);

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/salon/review-view">
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
                      <Form.Item name="comment" label="Comment" >
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item name="rating" label="Rate" rules={[{ required: true, message: 'Please select rate' }]} >
                      <Select size="large" className="sDash_fullwidth-select">
                          <Select.Option value="">Please Select</Select.Option >
                          <Select.Option value={1}>1</Select.Option>
                          <Select.Option value={2}>2</Select.Option>
                          <Select.Option value={3}>3</Select.Option>
                          <Select.Option value={4}>4</Select.Option>
                          <Select.Option value={5}>5</Select.Option>
                        </Select>
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
