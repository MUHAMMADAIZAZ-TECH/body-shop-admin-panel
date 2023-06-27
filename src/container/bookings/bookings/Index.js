import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { alertModal } from '../../../components/modals/antd-modals';
import { Button } from '../../../components/buttons/buttons';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { getBookings,searchBooking } from '../../../redux/bookings/bookingSlice';
import { getColumnSearchProps, handlePrint, exportToXLSX } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, bookingStates } = useSelector((state) => {
    return {
      isLoading: state.bookingStates.loading,
      bookingStates: state.bookingStates,
    };
  });
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
    setCurrentPage(1);
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
  const onHandleSearch = () => {
    if(searchText!==''){
      dispatch(searchBooking(searchText))
    }
    else{
      dispatch(getBookings({
        currentPage,
        pageSize,
        setTotalPages
      }));
    }
  };
  console.log(bookingStates.Bookings);
  if (bookingStates?.Bookings?.data?.length)
    bookingStates?.Bookings?.data?.map((booking, key) => {
      const {
        id,
        serviceName,
        salon_name,
        user_name,
        salon_address,
        booking_status,
        coupon,
        is_paid,
        total_amount,
        appointmentDate,
        booking_date,
      } = booking;
      return dataSource.push({
        key: key + 1,
        id,
        serviceName,
        salon_name,
        user_name,
        salon_address,
        booking_status,
        is_paid: is_paid === 1 ? 'Paid' : 'UnPaid',
        code: coupon.code,
        total_amount,
        booking_date,
        appointmentDate,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/bookings/view/${id}`}>
              <FeatherIcon icon="eye" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="edit" to={`/admin/bookings/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
          </div>
        ),
        booking,
      });
    });
  const csvData = [
    [
      'id',
      'serviceName',
      'salon_name',
      'user_name',
      'salon_address',
      'booking_status',
      'is_paid',
      'coupon',
      'total_amount',
      'appointmentDate',
      'booking_date',
    ],
  ];
  state.selectedRows.map((rows) => {
    const {
      id,
      serviceName,
      salon_name,
      user_name,
      salon_address,
      booking_status,
      coupon,
      is_paid,
      total_amount,
      appointmentDate,
      booking_date,
    } = rows.booking;
    return csvData.push([
      id,
      serviceName,
      salon_name,
      user_name,
      salon_address,
      booking_status,
      is_paid,
      coupon.code,
      total_amount,
      appointmentDate,
      booking_date,
    ]);
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Booking ID',
        'id',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => <div>#{text}</div>,
      fixed: 'left',
    },
    {
      title: 'Services',
      dataIndex: 'serviceName',
      key: 'serviceName',
      sorter: (a, b) => a.serviceName.length - b.serviceName.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Services',
        'serviceName',
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
      ...getColumnSearchProps(
        'Salon',
        'salon_name',
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
      title: 'Customer',
      dataIndex: 'user_name',
      key: 'user_name',
      sorter: (a, b) => a.user_name.length - b.user_name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Customer',
        'user_name',
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
      title: 'Address',
      dataIndex: 'salon_address',
      key: 'salon_address',
      sorter: (a, b) => a.salon_address.length - b.salon_address.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Address',
        'salon_address',
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
      title: 'Booking Status',
      dataIndex: 'booking_status',
      key: 'bookingstatus',
      sorter: (a, b) => a.booking_status.length - b.booking_status.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Booking Status',
        'booking_status',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => <Tag 
      className={text === 'completed'
      ? 'complete'
      : text === 'inProgress'
      ? 'late'
      : text === 'pending'
      ? 'early'
      : ''}>{text}</Tag>,
    },
    {
      title: 'Payment Status',
      dataIndex: 'is_paid',
      key: 'is_paid',
      sorter: (a, b) => a.is_paid.length - b.is_paid.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Payment Status',
        'is_paid',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => <Tag 
      className={text === "Paid"
      ? 'complete'
      : text === 'UnPaid'
      ? 'early'
      : ''}>{text}</Tag>,
    },
    {
      title: 'Coupon',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Coupon',
        'code',
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
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      sorter: (a, b) => a.total_amount.length - b.total_amount.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Total',
        'total_amount',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => <div>{text} $</div>,
    },
    {
      title: 'Booking At',
      dataIndex: 'booking_date',
      key: 'booking_date',
      sorter: (a, b) => a.booking_date.length - b.booking_date.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Booking At',
        'booking_date',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => moment(text).format('DD/MM/YY'),
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      sorter: (a, b) => a.appointmentDate.length - b.appointmentDate.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Appointment Date',
        'appointmentDate',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => moment(text).format('DD/MM/YY'),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
      fixed: 'right',
    },
  ];
  const handlePrinter = () => {
    if (state.selectedRows.length) {
      handlePrint(dataSource, columns, 'Bookings', state);
    } else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  };
  useEffect(() => {
    dispatch(getBookings({
      currentPage,
      pageSize,
      setTotalPages
    }));
  }, [currentPage, pageSize]);
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
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} onClick={onHandleSearch}/>
            </span>
            <input onChange={(e)=>setSearchText(e.target.value)} type="text" name="recored-search" placeholder="Enter Booking ID" />
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
                      pagination={{ 
                        pageSize,
                        total: totalPages * pageSize,
                        showSizeChanger: true ,
                        pageSizeOptions: ['10', '25', '50', '100'], 
                        onShowSizeChange: handlePageSizeChange,
                        current: currentPage,
                        onChange: setCurrentPage,
                      }}
                      dataSource={dataSource}
                      columns={columns}
                      // scroll={{ y: 550 }}
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
