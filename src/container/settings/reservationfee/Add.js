import React,{ useEffect } from 'react';
import { Row, Col, Form, Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getCountries} from '../../../redux/settings/settingsApis';

const AddNew = () => {
  const dispatch = useDispatch();
  const { isLoading,settingStates } = useSelector((state) => {
    return {
      isLoading: state.settingStates.loading,
      settingStates:state.settingStates
    };
  });
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      console.log(values);
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
 
  useEffect(()=>{
    dispatch(getCountries())
  },[])
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
        title="Reservation Fee | Reservation Fee Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Add Reservation Fee">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="country"
                        label="Country"
                        rules={[{ required: true, message: 'Please select country' }]}
                      >
                        <AutoComplete
                          options={settingStates?.countries?settingStates?.countries:[]}
                          placeholder="Select Country"
                          onSelect={(value,{country})=>{
                            form.setFieldsValue({
                              currency:Object.keys(country.currencies)[0]
                            })
                          }}
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="amount"
                        label="Amount"
                        initialValue=""
                        rules={[{ required: true, message: 'Please enter amount' }]}
                      >
                        <Input placeholder="Enter Amount" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                      <Form.Item
                        name="currency"
                        label="Currency"
                        initialValue=""
                        
                      >
                        <Input placeholder="Enter Currency" disabled />
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
