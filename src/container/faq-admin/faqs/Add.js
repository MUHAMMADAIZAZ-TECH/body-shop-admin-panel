import React from 'react';
import { Row, Col, Form,Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { createFaq } from '../../../redux/faq/faqSlice';

const AddNew = () => {
  const dispatch = useDispatch();
  const {isLoading } = useSelector(state => {
    return {
      isLoading: state.AxiosCrud.loading,
      url: state.AxiosCrud.url,
      salonState: state.salonStates
    };
  });
  const [form] = Form.useForm();
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(createFaq({  ...values}));
        form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
  };

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/faq-admin/faqs-view">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Faqs | Faqs Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Add Faq">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="question" label="Question" initialValue="" rules={[{ required: true, message: 'Please enter question' }]} >
                    <Input.TextArea rows={5} placeholder="Enter Question" />
                      </Form.Item>
                      </Col>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="answer" label="Answer" rules={[{ required: true, message: 'Please select answer' }]}>
                    <Input.TextArea rows={5} placeholder="Enter Answer" />
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

export default AddNew;
