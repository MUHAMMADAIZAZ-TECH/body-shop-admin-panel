import React, { useEffect, useState,useRef } from 'react';
import { Row, Col, Table, Spin,Button,Input,Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import {
  axiosDataSearch,
} from '../../../redux/crud/axios/actionCreator';
import { getBookings } from '../../../redux/bookings/bookingSlice';

const ViewPage = () => {
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
  const getColumnSearchProps = (dataIndex,placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
      // onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${placeholder}`}
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
  const dispatch = useDispatch();
  const { crud, isLoading,bookingStates } = useSelector(state => {
    return {
      crud: state.AxiosCrud.data,
      isLoading: state.AxiosCrud.loading,
      bookingStates:state.bookingStates
    };
  });
  console.log(bookingStates)
  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;

  useEffect(() => {
   dispatch(getBookings())
  }, [dispatch]);
  const dataSource = [];

  const onHandleSearch = e => {
    dispatch(axiosDataSearch(e.target.value, crud));
  };

  if (bookingStates?.Bookings?.length)
  bookingStates?.Bookings?.map((booking, key) => {
      const { id, serviceName, salon_id, user_name, salon_address,
        booking_status, coupon,is_paid,total_amount,appointmentDate,booking_date } = booking;
      return dataSource.push({
        key: key + 1,
        id,
        serviceName,
        salon_id,
        user_name,
        salon_address,
        booking_status,
        is_paid:is_paid===1?'Paid':'UnPaid',
        code:coupon.code,
        total_amount,
        booking_date,
        appointmentDate,
        action: (
          <div className="table-actions">
             <Link className="edit" to='#'>
              <FeatherIcon icon="eye" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="edit" to={`/admin/bookings/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            {/* &nbsp;&nbsp;&nbsp; */}
            {/* <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link> */}
          </div>
        ),
      });
    });

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('id','Booking ID'),
      render:(text)=><div>#{text}</div>
    },
    {
      title: 'Services',
      dataIndex: 'serviceName',
      key: 'serviceName',
      sorter: (a, b) => a.serviceName.length - b.serviceName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('serviceName','Services'),
    },
    {
      title: 'Salon',
      dataIndex: 'salon_id',
      key: 'salon_id',
      sorter: (a, b) => a.salon_id.length - b.salon_id.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('salon_id','Salon'),
    },
    {
      title: 'Customer',
      dataIndex: 'user_name',
      key: 'user_name',
      sorter: (a, b) => a.user_name.length - b.user_name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('user_name','Customer'),
    },
    {
      title: 'Address',
      dataIndex: 'salon_address',
      key: 'salon_address',
      sorter: (a, b) => a.salon_address.length - b.salon_address.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('salon_address','Address'),
    },
    {
      title: 'Booking Status',
      dataIndex: 'booking_status',
      key: 'bookingstatus',
      sorter: (a, b) => a.booking_status.length - b.booking_status.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('booking_status','Booking Status'),
    },
    {
      title: 'Payment Status',
      dataIndex: 'is_paid',
      key: 'is_paid',
      sorter: (a, b) => a.is_paid.length - b.is_paid.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('is_paid','Payment Status'),
    },
    {
      title: 'Coupon',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('code','Coupon'),
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      sorter: (a, b) => a.total_amount.length - b.total_amount.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('total_amount','Total'),
      render:(text)=><div>{text} $</div>
    },
    {
      title: 'Booking At',
      dataIndex: 'booking_date',
      key: 'booking_date',
      sorter: (a, b) => a.booking_date.length - b.booking_date.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('booking_date','Booking At'),
      render:(text)=>moment(text).format('DD/MM/YY')
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      sorter: (a, b) => a.appointmentDate.length - b.appointmentDate.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('appointmentDate','Appointment Date'),
      render:(text)=>moment(text).format('DD/MM/YY')
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <RecordViewWrapper>
      <PageHeader
        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
        ghost
        title="Bookings | Bookings Management"
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
