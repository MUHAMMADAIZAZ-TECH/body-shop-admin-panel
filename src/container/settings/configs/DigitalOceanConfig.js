import React,{useEffect} from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../styled';
import { exporttojson } from '../../../components/utilities/utilities';

const DigitalOceanConfig = ({
    handleDO
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
        DO_SPACES_ENDPOINT:configs[10]?.value,
        DO_SPACES_ENDPOINT_CDN:configs[11]?.value,
        DO_SPACES_KEY:configs[12]?.value,
        DO_SPACES_SECRET:configs[13]?.value,
        DO_SPACES_NAME:configs[14]?.value
      });
    }
  },[configs])
   
  return (
    <BasicFormWrapper>
      <Cards title="Digital Ocean Spaces configurations">
        <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleDO}>
          <Row gutter={30}>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="DO_SPACES_ENDPOINT" label="DO_SPACES_ENDPOINT" initialValue="">
                <Input placeholder="Enter DO_SPACES_ENDPOINT" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="DO_SPACES_ENDPOINT_CDN" label="DO_SPACES_ENDPOINT_CDN" initialValue="">
                <Input placeholder="Enter DO_SPACES_ENDPOINT_CDN" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="DO_SPACES_KEY" label="DO_SPACES_KEY" initialValue="">
                <Input placeholder="Enter DO_SPACES_KEY" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="DO_SPACES_SECRET" label="DO_SPACES_SECRET" initialValue="">
                <Input placeholder="Enter DO_SPACES_SECRET" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="DO_SPACES_NAME" label="DO_SPACES_NAME" initialValue="">
                <Input placeholder="Enter DO_SPACES_NAME" />
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


DigitalOceanConfig.propTypes = {
    handleDO: PropTypes.func,
  };
export default DigitalOceanConfig;
