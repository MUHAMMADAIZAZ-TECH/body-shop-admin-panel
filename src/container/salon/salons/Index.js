// eslint-disable-next-line camelcase
import React, { useEffect, useState,useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Table, Spin,Avatar ,Input, Space, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import {
  axiosDataRead,
  axiosDataDelete,
  axiosCrudGetData,
} from '../../../redux/crud/axios/actionCreator';
import { getSalons } from '../../../redux/salon/salonSlice';

const avatarStyle = {
  borderRadius: '4px', // Adjust the border radius as per your preference
  width: '60px', // Adjust the width and height as per your preference
  height: '60px',
  lineHeight: '100px', // Vertically center the content
  textAlign: 'center', // Horizontally center the content
};
const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading ,salonState} = useSelector(state => {
    return {
      isLoading: state.AxiosCrud.loading,
      salonState: state.salonStates
    };
  });

  const [state, setState] = useState({
    selectedRowKeys: [],
    searchText: '',
  });
  const { selectedRowKeys } = state;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        // onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
          
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
    }
  }, [dispatch]);
  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        axiosDataDelete({
          id,
          getData: () => {
            dispatch(axiosCrudGetData());
          },
        }),
      );
    }
    return false;
  };

  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
  };
  console.log(salonState?.approvedSalons)
  if (salonState?.approvedSalons?.length)
  salonState?.approvedSalons.map((salon, key) => {
      const { id,images, name,phone_number,mobile_number,address,ratings_average,availability_range,isActive } = salon;
      return dataSource.push({
        key: key + 1,
        images: (<Avatar style={avatarStyle} src={images[0]} size={60}/>),
        name,
        phone_number,
        mobile_number,
        address,
        ratings_average,
        availability_range,
        isActive:(isActive===1?'yes':'no'),
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/salon/salon/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
      });
    });
    console.log(searchText)
  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Phone no',
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Mobile no',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
      sorter: (a, b) => a.mobile_number.length - b.mobile_number.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Rating',
      dataIndex: 'ratings_average',
      key: 'ratings_average',
      sorter: (a, b) => a.ratings_average.length - b.ratings_average.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Availibility Range',
      dataIndex: 'availability_range',
      key: 'availability_range',
      sorter: (a, b) => a.availability_range.length - b.availability_range.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Active status',
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => a.isActive.length - b.isActive.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };
  console.log(salonState)
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(()=>{
    dispatch(getSalons())
  },[])
  return (
    <RecordViewWrapper>
      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/salon/salon-add">
                <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
              </Link>
            </Button>
          </div>
        }
        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
        ghost
        title="Salons | Salons Management"
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
                      onChange={(pagination, filters, sorter) => {
                        // Apply sorting
                        console.log(pagination,filters,sorter)
                        // const { columnKey, order } = sorter;
                        // Handle sorting based on columnKey and order
                        // ...
                      }}
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
