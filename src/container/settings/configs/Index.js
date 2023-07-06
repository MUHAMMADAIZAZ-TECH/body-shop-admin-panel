import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import DatabaseConfig from './DatabaseConfig';
import JwtConfig from './JwtConfig';
import DigitalOceanConfig from './DigitalOceanConfig';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { getConfigs, updateConfigs } from '../../../redux/settings/settingsApis';

const AddNew = () => {
  const dispatch = useDispatch();
  const handleDatabase = async (formValues) => {
    try {
      const valuesArray = Object.entries(formValues).map(([title, value]) => ({ title, value }));
      dispatch(updateConfigs(valuesArray));
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  const handleJWT = async (formValues) => {
    try {
      const valuesArray = Object.entries(formValues).map(([title, value]) => ({ title, value }));
      dispatch(updateConfigs(valuesArray));
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  const handleDO = async (formValues) => {
    try {
      const valuesArray = Object.entries(formValues).map(([title, value]) => ({ title, value }));
      dispatch(updateConfigs(valuesArray));
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  useEffect(() => {
    dispatch(getConfigs());
  }, []);
  return (
    <>
      <PageHeader
        ghost
        title="Configuration | Configuration Settings"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={12}>
            <DatabaseConfig handleDatabase={handleDatabase} />
          </Col>
          <Col xs={12}>
            <JwtConfig handleJWT={handleJWT} />
          </Col>
          <Col xs={12}>
            <DigitalOceanConfig handleDO={handleDO} />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddNew;
