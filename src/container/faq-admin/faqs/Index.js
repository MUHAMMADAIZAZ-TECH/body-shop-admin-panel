import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin } from 'antd';
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
import { deleteFaq, getFaqs } from '../../../redux/faq/faqSlice';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';
import { exportToXLSX, handlePrint, getColumnSearchProps } from '../../../components/utilities/utilities';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, faqStates } = useSelector((state) => {
    return {
      isLoading: state.faqStates.loading,
      faqStates: state.faqStates,
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

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteFaq({
          id,
          getData: () => {
            dispatch(getFaqs({
              currentPage,
              pageSize,
              setTotalPages
            }));
          },
        }),
      );
    }
    return false;
  };

  if (faqStates?.faqs.length)
    faqStates?.faqs?.map((faq, key) => {
      const { id, question, answer, updated_at } = faq;
      return dataSource.push({
        key: key + 1,
        question,
        answer,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/faq-admin/faqs-edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        faq
      });
    });
  const csvData = [['id', 'question', 'answer', 'updated_at']];
  state.selectedRows.map((rows) => {
    const { key, question, answer, updated_at } = rows;
    return csvData.push([key, question, answer, updated_at]);
  });
  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      ...getColumnSearchProps(
        'Question',
        'question',
        handleSearch,
        handleReset,
        searchInput,
        searchedColumn,
        searchText,
        setSearchText,
        setSearchedColumn,
      ),
      render:(question,{faq})=> <Link 
      className="disable-color" to={`/admin/faq-admin/faqs-edit/${faq.id}`}>{question}
    </Link>
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      ...getColumnSearchProps(
        'Answer',
        'answer',
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
      title: 'Update At',
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
    dispatch(getFaqs({
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
          <div>
            <Button className="btn-add_new" size="small" key="1" type="primary">
              <Link to="/admin/faq-admin/faqs-add">
                <FeatherIcon icon="plus" size={14} /> <span>Add New</span>
              </Link>
            </Button>
          </div>,
        ]}
        ghost
        title="Faqs | Faqs Management"
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
