import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Avatar, Tag } from 'antd';
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
import { deleteService, getServices } from '../../../redux/services/servicesSlice';
import { getColumnSearchProps, handlePrint, exportToXLSX } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, servicesStates } = useSelector((state) => {
    return {
      isLoading: state.servicesStates.loading,
      servicesStates: state.servicesStates,
    };
  });
  const dataSource = [];
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
            dispatch(getServices());
          },
        }),
      );
    }
    return false;
  };
  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
  };

  if (servicesStates?.services?.length)
    servicesStates?.services?.map((services, key) => {
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
  useEffect(() => {
    dispatch(getServices());
  }, []);
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
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
        ghost
        title="Services | Services Management"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      rowSelection={rowSelection}
                      pagination={{ pageSize: 10, showSizeChanger: true }}
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
