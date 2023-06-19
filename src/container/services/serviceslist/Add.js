import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Modal, Col, Form, Input, Select, Upload,Checkbox, TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getSalons } from '../../../redux/salon/salonSlice';
import { getCategories } from '../../../redux/categories/categoriesSlice';
import { createService } from '../../../redux/services/servicesSlice';

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddNew = () => {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [is_available, setis_available] = useState(false);
  const [enable_customer_booking, setenable_customer_booking] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { salonState,categoryState } = useSelector(state => {
    return {
      salonState:state.salonStates,
      categoryState:state.categoryStates
    };
  });
  const [form] = Form.useForm();
  const [files, setfiles] = useState([]);
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      console.log(values,files[0].originFileObj,is_available)
      dispatch(createService({
        ...values,
        duration:values.duration.format('HH:mm:ss'),
        file:files[0].originFileObj,
        is_available,
        enable_customer_booking
      }))
      form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
   
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
  
    useEffect(()=>{
      
      dispatch(getSalons())
      dispatch(getCategories())
    },[])
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
              <Cards title="Create Service">
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
                      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
                        <Input placeholder="Enter Name" />
                      </Form.Item>
                      <Form.Item name="salon_id" label="Salon" rules={[{ required: true, message: 'Please select salon' }]}>
                      <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                         {salonState.approvedSalons && salonState.approvedSalons.length>0 && salonState.approvedSalons?.map((salon)=><Option value={salon.id}>{salon.name}</Option>) }
                        </Select>
                      </Form.Item>
                     
                      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                        <Input placeholder="Enter Price" type='number' addonAfter="$" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24} className="mb-25">
                    <Form.Item name="category_id" label="Category" initialValue="" rules={[{ required: true, message: 'Please enter Category' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          {categoryState.categories && categoryState.categories.length>0 && categoryState.categories?.map((category)=><Option value={category.id}>{category.name}</Option>) }
                        </Select>
                      </Form.Item>
                      <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please select duration' }]}>
                      <TimePicker style={{ marginRight: '10px' }} className="sDash_fullwidth-select"  
                         onChange={(time) => {
                          form.setFieldsValue({ duration: time });
                        }}
                      />
                      </Form.Item>
                    <Form.Item name="description" label="Description" >
                        <Input.TextArea rows={5} placeholder="Enter Description" />
                      </Form.Item>
                      <Form.Item name="is_available" label="Available" >
                      <Checkbox value={is_available} name="is_available" onChange={(e)=>setis_available(e.target.checked)}>Available</Checkbox>
                      </Form.Item>
                      <Form.Item name="enable_customer_booking" label="Enabled" >
                      <Checkbox value={enable_customer_booking} name="enable_customer_booking" onChange={(e)=>setenable_customer_booking(e.target.checked)}>Enabled</Checkbox>
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
                        {/* {isLoading ? 'Loading...' : 'Submit'} */}
                        Submit
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
