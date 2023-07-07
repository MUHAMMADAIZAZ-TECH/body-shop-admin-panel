import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { alertModal } from '../../../components/modals/antd-modals';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { getTransactions,SearchTransactions } from '../../../redux/transactions/transactionApis';
import { exportToXLSX, handlePrint, getColumnSearchProps } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, TransactionStates } = useSelector((state) => {
    return {
      isLoading: state.transactionStates.loading,
      TransactionStates: state.transactionStates,
    };
  });
  console.log(TransactionStates);
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




  if (TransactionStates?.transactions?.data?.length)
    TransactionStates?.transactions?.data?.map((transaction, key) => {
      const { booking_id, amount, status, user_name, created_at, updated_at } = transaction;
      return dataSource.push({
        key: key + 1,
        booking_id,
        amount,
        status,
        user_name,
        created_at,
        updated_at,
        transaction,
      });
    });
  const csvData = [['id', 'booking_id', 'amount', 'status', 'user_name', 'created_at', 'updated_at']];
  state.selectedRows.map((rows) => {
    const { id, booking_id, amount, status, user_name, created_at, updated_at } = rows.transaction;
    return csvData.push([id, booking_id, amount, status, user_name, created_at, updated_at]);
  });
  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'booking_id',
      key: 'booking_id',
      sorter: (a, b) => a.booking_id.length - b.booking_id.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Booking ID',
        'booking_id',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (booking_id) => <div>#{booking_id}</div>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount.length - b.amount.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Amount',
        'amount',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => <div>{text} €</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Status',
        'status',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render: (text) => <Tag className={text === "success"? 'complete': 'early'}>{text}</Tag>,
    },
    {
      title: 'User',
      dataIndex: 'user_name',
      key: 'user_name',
      sorter: (a, b) => a.user_name.length - b.user_name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'User',
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
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).format('YYYY/MM/DD'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '90px',
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).fromNow(),
    },
  ];
  const handlePrinter = () => {
    if (state.selectedRows.length) {
      handlePrint(dataSource, columns, 'Payments', state);
    } else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  };
  const Search = () => {
    dispatch(SearchTransactions({
      currentPage,
      pageSize,
      setTotalPages,
      searchText
    }));
  };
  const onEnter = (event) =>{
    if (event.key === "Enter") {
      Search()
    }
   }
  useEffect(() => {
    dispatch(getTransactions({
      currentPage,
      pageSize,
      setTotalPages
    }));
  }, [dispatch,currentPage, pageSize]);
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
              <FeatherIcon icon="search" size={14} onClick={Search}/>
            </span>
            <input onChange={(e)=>setSearchText(e.target.value)} 
            onKeyDown={onEnter}
            type="text" name="recored-search" 
            placeholder="Enter Booking ID" />
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
                      pagination={{ 
                        pageSize,
                        total: totalPages * pageSize,
                        showSizeChanger: true ,
                        pageSizeOptions: ['10', '25', '50', '100'], 
                        onShowSizeChange: handlePageSizeChange,
                        current: currentPage,
                        onChange: setCurrentPage,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,

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
