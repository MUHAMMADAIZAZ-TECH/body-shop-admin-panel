import React, { useState } from 'react';
import { Row, Col, Form,Input,Upload,Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { createCategory } from '../../redux/categories/categoriesSlice';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  const uploadButton = (
    <div><PlusOutlined />
      <div style={{ marginTop: 8, }}>Upload</div>
    </div>
  );
const AddNew = ({match}) => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { isLoading } = useSelector(state => {
    return {
      isLoading: state.AxiosCrud.loading,
      url: state.AxiosCrud.url,
      salonState: state.salonStates
    };
  });
  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
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
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(createCategory({
        ...values,
        file:files[0].originFileObj
      }))
      console.log(values,files[0].originFileObj)
       form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
   
  };
  console.log(match)

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/admin/categories/category-view">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Categories | Categories Management"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BasicFormWrapper>
              <Cards title="Add Category">
                <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={12} xs={24} className="mb-25">
                    <Upload
                        listType="picture-card"
                        fileList={files}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        name='files'
                      >
                        {files.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                          alt="example"
                          style={{
                            width: '100%',
                          }}
                          src={previewImage}
                        />
                      </Modal>
                      <Form.Item name="description" label="Description" >
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                     
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter Name' }]}>
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                    <Form.Item name="color" label="Color" rules={[{ required: true, message: 'Please enter color' }]}>
                        <Input placeholder="Enter Color" />
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

AddNew.propTypes = {
  match: PropTypes.object,
};

export default AddNew;
