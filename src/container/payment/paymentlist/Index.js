import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import {
  axiosDataSearch,
} from '../../../redux/crud/axios/actionCreator';
import { getTransactions } from '../../../redux/transactions/transactionSlice';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { crud, isLoading ,TransactionStates} = useSelector(state => {
    return {
      crud: state.AxiosCrud.data,
      isLoading: state.AxiosCrud.loading,
      TransactionStates:state.transactionStates
    };
  });
console.log(TransactionStates.transactions);
  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  const dataSource = [];

  const onHandleSearch = e => {
    dispatch(axiosDataSearch(e.target.value, crud));
  };

  if (TransactionStates?.transactions?.length)
  TransactionStates?.transactions?.map((transaction, key) => {
      const { booking_id, amount, status, created_at, updated_at } = transaction;
      return dataSource.push({
        key: key + 1,
        booking_id,
        amount,
        status,
        created_at,
        updated_at
      });
    });

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'booking_id',
      key: 'booking_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: text => <div>{text} $</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => moment(text).format('YYYY/MM/DD'),
    },
    {
      title: 'Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: text => moment(text).fromNow(),
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
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/payment/paymentlist-add">
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
        title="Payments | Payments Management"
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
