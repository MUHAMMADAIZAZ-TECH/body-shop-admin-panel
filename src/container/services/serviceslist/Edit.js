import React, { useEffect,useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, Select, Upload,Modal,Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import {  axiosDataSingle } from '../../../redux/crud/axios/actionCreator';

const { Option } = Select;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { crud, isLoading } = useSelector(state => {
    return {
      crud: state.SingleAxiosCrud.data,
      isLoading: state.AxiosCrud.loading,
      url: state.AxiosCrud.url,
      isFileLoading: state.AxiosCrud.fileLoading,
    };
  });
  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  useEffect(() => {
    form.setFieldsValue(crud);
  }, [form, crud]);

  useEffect(() => {
    if (axiosDataSingle) {
      dispatch(axiosDataSingle(parseInt(match.params.id, 10)));
    }
  }, [dispatch, match.params.id]);

  const handleSubmit = values => {
   console.log(values)
   
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList, }) => {
    const fileList  = newFileList?.map((file)=>{
      return{...file, status:'done'}
    })
    setfiles(fileList)
  };
  const uploadButton = (
    <div><PlusOutlined />
      <div style={{ marginTop: 8, }}>Upload</div>
    </div>
  );
  return (
    <>
    <PageHeader
      buttons={[
        <Button className="btn-add_new" size="default" key="1" type="primary">
          <Link to="/admin/services/services-list-view">View All</Link>
        </Button>,
      ]}
      ghost
      title="Services | Services Management"
    />
    <Main>
      <Row gutter={15}>
        <Col xs={24}>
          <BasicFormWrapper>
            <Cards title="Update Service">
              <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                <Row gutter={30}>
                  <Col sm={12} xs={24} className="mb-25">
                  {/* <Form.Item name="image" label="Images" rules={[{ required: true, message: 'Please select images' }]}> */}
                  <Upload
                      listType="picture-card"
                      fileList={files}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      name='files'
                    >
                      {files.length >= 5 ? null : uploadButton}
                    </Upload>
                    {/* </Form.Item> */}
                 
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt="example"
                        style={{
                          width: '100%',
                        }}
                        src={previewImage}
                      />
                    </Modal>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
                      <Input placeholder="Enter Name" />
                    </Form.Item>
                    <Form.Item name="salon" label="Salon" rules={[{ required: true, message: 'Please enter salon' }]}>
                      <Input placeholder="Enter Salon" />
                    </Form.Item>
                   
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                      <Input placeholder="Enter Price" />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24} className="mb-25">
                  <Form.Item name="category" label="Category" initialValue="" rules={[{ required: true, message: 'Please enter Category' }]} >
                      <Select size="large" className="sDash_fullwidth-select">
                        <Option value="">Please Select</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please enter duration' }]}>
                        <Input placeholder="Enter Duration" />
                      </Form.Item>
                  <Form.Item name="description" label="Description" >
                      <Input.TextArea rows={5} placeholder="Enter Description" />
                    </Form.Item>
                    <Form.Item name="available" label="Available" >
                      <Checkbox defaultChecked>Enabled</Checkbox>
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
