import React,{useEffect} from 'react';
import { Row, Col, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../styled';
import { exporttojson } from '../../../components/utilities/utilities';

const DatabaseConfig = ({
    handleDatabase
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
      console.log(configs);
      useEffect(()=>{
        if(configs.length>0){
          form.setFieldsValue({
            DB_HOST:configs[0]?.value,
            DB_USER:configs[1]?.value,
            DB_PASSWORD:configs[2]?.value,
            DB_PORT:configs[3]?.value,
            DB_NAME:configs[4]?.value
          });
        }
      },[configs])
  return (
    <BasicFormWrapper>
    <Cards title="Database Configurations">
      <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleDatabase}>
        <Row gutter={30}>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="DB_HOST"
              label="DB_HOST"
              initialValue=""
            >
              <Input placeholder="Enter DB_HOST" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="DB_USER"
              label="DB_USER"
              initialValue=""
            >
              <Input placeholder="Enter DB_USER" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="DB_PASSWORD"
              label="DB_PASSWORD"
              initialValue=""
            >
              <Input placeholder="Enter DB_PASSWORD" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="DB_PORT"
              label="DB_PORT"
              initialValue=""
            >
              <Input placeholder="Enter DB_PORT" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} className="mb-25">
            <Form.Item
              name="DB_NAME"
              label="DB_NAME"
              initialValue=""
            >
              <Input placeholder="Enter DB_NAME" />
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

DatabaseConfig.propTypes = {
    handleDatabase: PropTypes.func,
  };
export default DatabaseConfig