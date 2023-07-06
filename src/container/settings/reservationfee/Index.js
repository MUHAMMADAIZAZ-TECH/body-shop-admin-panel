import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { alertModal } from '../../../components/modals/antd-modals';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { deleteCustomPage, getReservationFees } from '../../../redux/settings/settingsApis';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';
import { exportToXLSX, handlePrint, getColumnSearchProps } from '../../../components/utilities/utilities';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, settingStates } = useSelector((state) => {
    return {
      isLoading: state.settingStates.loading,
      settingStates: state.settingStates,
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
  const [pageSize, setPageSize] = useState(12);
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
        deleteCustomPage({
          id,
          getData: () => {
            dispatch(getReservationFees());
          },
        }),
      );
    }
    return false;
  };
console.log(settingStates?.listofreservationfees);
  if (settingStates?.listofreservationfees?.length)
  settingStates?.listofreservationfees?.map((CustomPage, key) => {
      const { id, country, amount,currency,symbol,created_at,updated_at } = CustomPage;
      return dataSource.push({
        key: key + 1,
        country,
        currency,
        symbol,
        amount,
        created_at,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/settings/reservationfee/edit/${id}`}>
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
  const csvData = [['id', 'country', 'currency', 'symbol','created_at','updated_at']];
  state.selectedRows.map((rows) => {
    const { key, country, currency, symbol,amount,created_at,updated_at } = rows;
    return csvData.push([key, country, currency, symbol,amount,created_at,updated_at]);
  });
  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      ...getColumnSearchProps(
        'Country',
        'country',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      fixed: 'left',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      ...getColumnSearchProps(
        'Currency',
        'currency',
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
      title: 'Currency Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => moment(text).format('YYYY/MM/DD'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => moment(text).fromNow(),
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
      handlePrint(dataSource, columns, 'Faqs', state);
    } else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  };
  useEffect(() => {
    dispatch(getReservationFees());
  }, [dispatch]);
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
          // <div>
          //   <Button className="btn-add_new" size="small" key="1" type="primary">
          //     <Link to="/admin/settings/reservationfee/add">
          //       <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
          //     </Link>
          //   </Button>
          // </div>,
        ]}
        ghost
        title="Reservation Fees | Reservation Fees Management"
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
                        showSizeChanger: true ,
                        pageSizeOptions: ['5', '10', '20', '50'], 
                        onShowSizeChange: handlePageSizeChange
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
