import React, { useEffect, useState ,useRef} from 'react';
import { Row, Col, Table, Spin} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import {deleteFaq, getFaqs} from '../../../redux/faq/faqSlice'
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';
import { exportToXLSX ,getColumnSearchProps} from '../../../components/utilities/utilities';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading ,faqStates} = useSelector(state => {
    return {
      isLoading: state.faqStates.loading,
      faqStates: state.faqStates,
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
        deleteFaq({
          id,
          getData: () => {
            dispatch(getFaqs());
          },
        }),
      );
    }
    return false;
  };

  const onHandleSearch = e => {
    console.log(e.target.value)
  };

  if (faqStates?.faqs.length)
  faqStates?.faqs?.map((person, key) => {
      const { id,question,answer,updated_at } = person;
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
        ...getColumnSearchProps('Question','question', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
      },
      {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
        ...getColumnSearchProps('Answer','answer', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
      },
      {
        title: 'Update At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (text)=>moment(text).fromNow()
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        width: '90px',
      },
    ];
  
    useEffect(() => {
      dispatch(getFaqs())
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
            <Link to="/admin/faq-admin/faqs-add">
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
