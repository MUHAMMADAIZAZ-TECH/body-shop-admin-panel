import React,{useEffect} from 'react';
import { Row, Col, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../styled';
import { exporttojson } from '../../../components/utilities/utilities';

const JwtConfig = ({
    handleJWT
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
        JWT_SECRET:configs[5]?.value,
        JWT_EXPIRES_IN:configs[6]?.value,
        JWT_COOKIE_EXPIRES_IN:configs[7]?.value,
        REFRESH_TOKEN_SECRET:configs[8]?.value,
        REFRESH_TOKEN_EXPIRES_IN:configs[9]?.value
      });
    }
  },[configs])

  return (
    <BasicFormWrapper>
      <Cards title="JWT Token configurations">
        <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleJWT}>
          <Row gutter={30}>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="JWT_SECRET" label="JWT_SECRET" initialValue="">
                <Input placeholder="Enter JWT_SECRET" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="JWT_EXPIRES_IN" label="JWT_EXPIRES_IN" initialValue="">
                <Input placeholder="Enter JWT_EXPIRES_IN" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="JWT_COOKIE_EXPIRES_IN" label="JWT_COOKIE_EXPIRES_IN" initialValue="">
                <Input placeholder="Enter JWT_COOKIE_EXPIRES_IN" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="REFRESH_TOKEN_SECRET" label="REFRESH_TOKEN_SECRET" initialValue="">
                <Input placeholder="Enter REFRESH_TOKEN_SECRET" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="REFRESH_TOKEN_EXPIRES_IN" label="REFRESH_TOKEN_EXPIRES_IN" initialValue="">
                <Input placeholder="Enter REFRESH_TOKEN_EXPIRES_IN" />
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
              <Button className="btn-cancel" size="large"  onClick={exportToJsonFormat}>
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
  );
};


JwtConfig.propTypes = {
    handleJWT: PropTypes.func,
  };
  
export default JwtConfig;
