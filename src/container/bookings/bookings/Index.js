import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      render:(text)=><div>#{text}</div>
    },
    {
      title: 'Services',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Salon',
      dataIndex: 'salon_id',
      key: 'salon_id',
    },
    {
      title: 'Customer',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Address',
      dataIndex: 'salon_address',
      key: 'salon_address',
    },
    {
      title: 'Booking Status',
      dataIndex: 'booking_status',
      key: 'bookingstatus',
    },
    {
      title: 'Payment Status',
      dataIndex: 'is_paid',
      key: 'is_paid',
    },
    {
      title: 'Coupon',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render:(text)=><div>{text} $</div>
    },
    {
      title: 'Booking At',
      dataIndex: 'booking_date',
      key: 'booking_date',
      render:(text)=>moment(text).format('DD/MM/YY')
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
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
