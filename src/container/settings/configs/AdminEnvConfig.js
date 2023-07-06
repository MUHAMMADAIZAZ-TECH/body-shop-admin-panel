import React,{useEffect} from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../styled';
import { exporttojson } from '../../../components/utilities/utilities';

const AdminENV = ({
  handleFB
}) => {
    const { isLoading,configs } = useSelector((state) => {
        return {
          isLoading: state.settingStates.loading,
          configs: state.settingStates.configs,
        };
      });

      const [form] = Form.useForm();
      const exportToJsonFormat = ()=>{
        const formValues = form.getFieldsValue();
        exporttojson(formValues)
      }
      useEffect(()=>{
        if(configs.length>0){
          form.setFieldsValue({
            REACT_APP_FIREBASE_API_KEY:configs[15]?.value,
            REACT_APP_FIREBASE_AUTH_DOMAIN:configs[16]?.value,
            REACT_APP_FIREBASE_DATABASE_URL:configs[17]?.value,
            REACT_APP_FIREBASE_PROJECT_ID:configs[18]?.value,
            REACT_APP_FIREBASE_STORAGE_BUCKET:configs[19]?.value,
            REACT_APP_FIREBASE_MESSAGING_SENDER_ID:configs[20].value,
            REACT_APP_FIREBASE_APP_ID:configs[21].value,
            REACT_APP_FIREBASE_MEASUREMENT_ID:configs[22].value,
            REACT_APP_MY_API_END_POINT:configs[23].value,
          });
        }
      },[configs])
  return (
    <BasicFormWrapper>
    <Cards title="Admin ENV Configurations">
      <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleFB}>
        <Row gutter={30}>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_API_KEY"
              label="REACT_APP_FIREBASE_API_KEY"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_API_KEY" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_AUTH_DOMAIN"
              label="REACT_APP_FIREBASE_AUTH_DOMAIN"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_AUTH_DOMAIN" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_DATABASE_URL"
              label="REACT_APP_FIREBASE_DATABASE_URL"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_DATABASE_URL" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_PROJECT_ID"
              label="REACT_APP_FIREBASE_PROJECT_ID"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_PROJECT_ID" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_STORAGE_BUCKET"
              label="REACT_APP_FIREBASE_STORAGE_BUCKET"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_STORAGE_BUCKET" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
              label="REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_MESSAGING_SENDER_ID" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_APP_ID"
              label="REACT_APP_FIREBASE_APP_ID"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_APP_ID" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_FIREBASE_MEASUREMENT_ID"
              label="REACT_APP_FIREBASE_MEASUREMENT_ID"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_FIREBASE_MEASUREMENT_ID" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="REACT_APP_MY_API_END_POINT"
              label="REACT_APP_MY_API_END_POINT"
              initialValue=""
            >
              <Input placeholder="Enter REACT_APP_MY_API_END_POINT" />
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
              onClick={exportToJsonFormat}
            >
              Download JSON
            </Button>
            <Button size="default" htmlType="Save" type="primary">
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </Form>
    </Cards>
  </BasicFormWrapper>
  )
}

AdminENV.propTypes = {
  handleFB: PropTypes.func,
  };
export default AdminENV