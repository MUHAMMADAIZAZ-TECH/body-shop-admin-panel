import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Avatar, Tag,Form,Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { alertModal } from '../../../components/modals/antd-modals';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { deleteService, getServicesofSalon } from '../../../redux/services/servicesSlice';
import { getColumnSearchProps, handlePrint, exportToXLSX } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';
import { getSalonsList } from '../../../redux/salon/salonSlice';


const { Option } = Select;
const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, servicesStates,salonState } = useSelector((state) => {
    return {
      isLoading: state.servicesStates.loading,
      salonState: state.salonStates,
      servicesStates: state.servicesStates,
    };
  });
  const [form] = Form.useForm();
  console.log(servicesStates.services);
  const dataSource = [];
  const [currentPage, setCurrentPage] = useState(1); // Initial current page
  const [totalPages, setTotalPages] = useState(0); 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [state, setState] = useState({
    isModalVisible: false,
    fileName: 'bodyShop',
    convertedTo: 'csv',
    selectedRowKeys: 0,
    selectedRows: [],
  });
  const [pageSize, setPageSize] = useState(10);
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteService({
          id,
          getData: () => {
            dispatch(getServicesofSalon(searchText))
          },
        }),
      );
    }
    return false;
  };
  if (servicesStates?.services?.data?.length)
    servicesStates?.services?.data?.map((services, key) => {
      const { id, image, name, salon_name, price, category_name, is_available, updated_at } = services;
      return dataSource.push({
        key: key + 1,
        image: image && <Avatar className="myavatar" src={image} size={60} />,
        name,
        salon_name,
        price,
        category_name,
        is_available,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/services/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        services,
      });
    });
  const csvData = [['id', 'name', 'salon_name', 'price', 'category_name', 'is_available', 'updated_at']];
  state.selectedRows.map((rows) => {
    const { id, name, salon_name, price, category_name, is_available, updated_at } = rows.services;
    return csvData.push([id, name, salon_name, price, category_name, is_available, updated_at]);
  });
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => a.image.length - b.image.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Name',
        'name',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
    },
    {
      title: 'Salon',
      dataIndex: 'salon_name',
      key: 'salon_name',
      sorter: (a, b) => a.salon_name.length - b.salon_name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ['descend', 'ascend'],
      render: (price) => <span>{price} $</span>,
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: (a, b) => a.category_name.length - b.category_name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Available',
      dataIndex: 'is_available',
      key: 'is_available',
      sorter: (a, b) => a.is_available.length - b.is_available.length,
      sortDirections: ['descend', 'ascend'],
      render: (is_available) => <Tag className="complete">{is_available === 1 ? 'yes' : 'no'}</Tag>,
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).fromNow(),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  const handlePrinter = () => {
    if (state.selectedRows.length) {
      handlePrint(dataSource, columns, 'Categories', state);
    } else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  };
  const handleSubmit = async () => {
    try {
      await form.validateFields(); // Validate all form fields
      console.log(searchText);
      dispatch(getServicesofSalon(searchText))
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1); // Increment the current page number
  };
  useEffect(() => {
    dispatch(getSalonsList({
      currentPage,
      pageSize:10,
      setTotalPages
    }));
  }, [dispatch,currentPage]);
  return (
    <RecordViewWrapper>
      <PageHeader
        buttons={[
          <div className="sDash_export-box">
            <MYExportButton state={state} setState={setState} exportToXLSX={exportToXLSX} csvData={csvData} />
          </div>,
          <div>
            <Button className="btn-add_new" size="small" key="1" type="white" onClick={() => handlePrinter()}>
              <FeatherIcon icon="printer" size={14} /> <span>Print</span>
            </Button>
          </div>,
          <div>
            <Button className="btn-add_new" size="small" key="1" type="primary">
              <Link to="/admin/services/services-list-add">
                <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
              </Link>
            </Button>
          </div>,
        ]}
        ghost
        title="Services | Services Management"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
            <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                <Row gutter={30}>
                  <Col sm={10} xs={24} className="mb-25">
                    <Form.Item
                      name="salon_id"
                      label="Salon"
                      initialValue=""
                      rules={[{ required: true, message: 'Please select salon' }]}
                    >
                      <Select size="large" className="sDash_fullwidth-select" onChange={(e,select)=>{
                        const { value } = select;
                        setSearchText(value)
                      }}>
                        <Option value="">Please Select</Option>
                        {salonState.salonsList &&
                          salonState.salonsList.length > 0 &&
                          salonState.salonsList?.map((salon) => <Option value={salon.id}>{salon.name}</Option>)}
                         {currentPage < totalPages && (
                        <Option disabled>
                          <Button size="small" type="primary" onClick={handleLoadMore} block >
                            Load More
                          </Button>
                        </Option>
                      )}
                       </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={2} xs={24} className="mb-25 mt-25">
                    <Button size="default" htmlType="Save" type="primary">
                     Search
                    </Button>
                  </Col>
                </Row>
              </Form>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      rowSelection={rowSelection}
                      pagination={{ 
                        pageSize,
                        // total: totalPages * pageSize,
                        // showSizeChanger: true ,
                        // pageSizeOptions: ['10', '25', '50', '100'], 
                        onShowSizeChange: handlePageSizeChange,
                        current: currentPage,
                        onChange: setCurrentPage,
                      }}
                      dataSource={dataSource}
                      columns={columns}
                    />
                  </TableWrapper>
                </div>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
