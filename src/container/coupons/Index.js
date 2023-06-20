import React, { useEffect, useState,useRef } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { deleteCoupon, getCoupons } from '../../redux/coupons/couponSlice';
import { exportToXLSX,getColumnSearchProps } from '../../components/utilities/utilities';
import MYExportButton from '../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading,couponStates } = useSelector(state => {
    return {
      isLoading: state.couponStates.loading,
      couponStates:state.couponStates
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

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteCoupon({
          id,
          getData: () => {
            dispatch(getCoupons());
          },
        }),
      );
    }
    return false;
  };
  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
  };
  console.log(couponStates?.coupons)
  if (couponStates?.coupons?.length)
  couponStates?.coupons?.map((coupon, key) => {
      const { id, code, discount_value,discount_type,redeemed_count,max_redemptions, end_date, updated_at, } = coupon;
      return dataSource.push({
        key: key + 1,
        code,
        discount_value:(discount_type==='percentage'?`${discount_value} %` :`${discount_value} $`  ),
        max_redemptions,
        redeemed_count,
        end_date,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/coupons/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        coupon
      });
    });
    const csvData = [['id', 'code', 'discount_value', 'discount_type','redeemed_count',
    'max_redemptions','end_date','isActive','updated_at']];
    state.selectedRows.map((rows) => {
      const { id, code, discount_value,discount_type,redeemed_count,max_redemptions, end_date, updated_at} = rows.coupon;
      return csvData.push([id, code, discount_value,discount_type,redeemed_count,max_redemptions, end_date, updated_at]);
    });
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Code','code', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Discount',
      dataIndex: 'discount_value',
      key: 'discount_value',
      sorter: (a, b) => a.discount_value.length - b.discount_value.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Discount','discount_value', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Max Redeems',
      dataIndex: 'max_redemptions',
      key: 'max_redemptions',
      sorter: (a, b) => a.max_redemptions.length - b.max_redemptions.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Max Redeems','max_redemptions', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Redeems',
      dataIndex: 'redeemed_count',
      key: 'redeemed_count',
      sorter: (a, b) => a.redeemed_count.length - b.redeemed_count.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Redeems','redeemed_count', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Expires At',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => a.end_date.length - b.end_date.length,
      sortDirections: ['descend', 'ascend'],
      render: text => moment(text).format('YYYY/MM/DD'),
    },
    {
      title: 'Updated At',
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

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);
  return (
    <RecordViewWrapper>
      <PageHeader
        buttons={[
          <div className="sDash_export-box">
            <MYExportButton state={state} setState={setState} exportToXLSX={exportToXLSX} csvData={csvData}/>
        </div>,
         <div>
         <Button className="btn-add_new" size="small" key="1" type="primary">
           <Link to="/admin/coupons/coupons-add">
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
        title="Coupons | Coupons Management"
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
