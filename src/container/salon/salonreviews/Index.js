import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { alertModal } from '../../../components/modals/antd-modals';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { deleteSalonReview, getAllReviews,getAllReviewsBySearch } from '../../../redux/salon/salonSlice';
import { exportToXLSX, handlePrint, getColumnSearchProps } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { salonState, isLoading } = useSelector((state) => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.loading,
    };
  });
  const dataSource = [];
  // search states
  const [currentPage, setCurrentPage] = useState(1); // Initial current page
  const [totalPages, setTotalPages] = useState(0); 
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('');

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
  // search functions
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const handleDelete = (review) => {
    console.log(review);
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteSalonReview({
          id:review.id,
          salonid:review.salon_id,
          getData: () => {
            dispatch(getAllReviews({
              currentPage,
              pageSize,
              setTotalPages
            }));
          },
        }),
      );
      console.log('delete');
    }
    return false;
  };
  const onHandleSearch = (e) => {
    setSearchText(e.target.value);
  };
  // rows
  if (salonState?.salonreviews?.data?.length)
    salonState?.salonreviews?.data?.map((review, key) => {
      const { id, comment, rating, salon_name, updated_at, user_name } = review;
      return dataSource.push({
        key: key + 1,
        comment,
        rating,
        user_name,
        salon_name,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/salon/review/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(review)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        review,
      });
    });
  const csvData = [['id', 'comment', 'rating', 'user_name', 'salon_name', 'updated_at']];
  state.selectedRows.map((rows) => {
    const { id, comment, rating, user_name, salon_name, updated_at } = rows.review;
    return csvData.push([id, comment, rating, user_name, salon_name, updated_at]);
  });
  // coloumn
  const columns = [
    {
      title: 'Review',
      dataIndex: 'comment',
      key: 'comment',
      sorter: (a, b) => a.comment.length - b.comment.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Review',
        'comment',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render:(name,{review})=> <Link 
      className="disable-color" to={`/admin/salon/review/edit/${review.id}`}>{name}
    </Link>,
      fixed: 'left',
    },
    {
      title: 'Rate',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating.length - b.rating.length,
      sortDirections: ['descend', 'ascend'],
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
      sorter: (a, b) => a.user_name.length - b.user_name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Salon Name',
      dataIndex: 'salon_name',
      key: 'salon_name',
      sorter: (a, b) => a.salon_name.length - b.salon_name.length,
      sortDirections: ['descend', 'ascend'],
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
      fixed: 'right',
    },
  ];
  const handlePrinter = () => {
    if (state.selectedRows.length) {
      handlePrint(dataSource, columns, 'Salon Reviews', state);
    } else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  };
  const Search = () => {
    console.log(state);
    dispatch(getAllReviewsBySearch({
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
    dispatch(getAllReviews({
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
            <FeatherIcon icon="search" size={14} onClick={Search} />
          </span>
          <input 
          onChange={onHandleSearch} 
          onKeyDown={onEnter}
          type="text" 
          name="recored-search" 
          placeholder="Enter user name or salon name" />
        </div>,
        ]}
        ghost
        title="Salon Reviews | Salon Reviews Management"
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
