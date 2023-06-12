import React from 'react';
import { Row, Col, Form, Input, Select,DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const AddNew = () => {
 
  const { isLoading } = useSelector(state => {
    return {
      isLoading: state.AxiosCrud.loading,
      url: state.AxiosCrud.url,
      isFileLoading: state.AxiosCrud.fileLoading,
    };
  });

  const [form] = Form.useForm();
  // const [document, setdocument] = useState(null);
  const handleSubmit = async () => {

    // form.resetFields();
  };

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
              <Cards title="Create Service">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="bookingstatus" label="Booking Status" initialValue="" rules={[{ required: true, message: 'Please select booking status' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="address" label="Address" initialValue="" rules={[{ required: true, message: 'Please select address' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="paymentstatus" label="Payment Status" initialValue="" rules={[{ required: true, message: 'Please enter Category' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="description" label="Description" >
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="bookingat" label="BookingAt" >
                    <DatePicker style={{ width: '100%' }} format={dateFormat} />
                      </Form.Item>
                      <Form.Item name="startat" label="Start At" >
                    <DatePicker style={{ width: '100%' }} format={dateFormat} />
                      </Form.Item>
                      <Form.Item name="endsat" label="Ends At" >
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

export default AddNew;
