import React, { useEffect, useState,useRef } from 'react';
import { Row, Col, Table, Spin, Avatar, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { deleteCategory, getCategories } from '../../redux/categories/categoriesSlice';
import { getColumnSearchProps,exportToXLSX } from '../../components/utilities/utilities';
import MYExportButton from '../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading ,categoryStates} = useSelector(state => {
    return {
      isLoading: state.categoryStates.loading,
      categoryStates: state.categoryStates
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
      dispatch(deleteCategory({
        id,
        getData:()=>{
          dispatch(getCategories())
        }
      }));
    }
    return false;
  };

  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
  };
  console.log(categoryStates)
  if (categoryStates?.categories?.length)
  categoryStates?.categories?.map((category, key) => {
      const { id,image, name, color,description, created_at, updated_at } = category;
      return dataSource.push({
        key: key + 1,
        image: (image && <Avatar className='myavatar' src={image} size={60} />),
        name,
        color:(<div style={{backgroundColor:`${color}`,padding:5,borderRadius:5,textAlign:"center"}}>{color}</div>),
        description,
        created_at,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/categories/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        category
      });
    });
    const csvData = [['id', 'name', 'color', 'description','created_at','updated_at']];
    state.selectedRows.map((rows) => {
      const { id, name, color,description, created_at, updated_at} = rows.category;
      return csvData.push([id, name, color,description, created_at, updated_at]);
    });
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => a.image.length - b.image.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Name','name', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      sorter: (a, b) => a.color.length - b.color.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Color','color', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Description','description', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      sortDirections: ['descend', 'ascend'],
      render: text => moment(text).fromNow(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortDirections: ['descend', 'ascend'],
      render: text => moment(text).fromNow(),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  return (
    <RecordViewWrapper>
      <PageHeader
        buttons={[
          <div className="sDash_export-box">
            <MYExportButton state={state} setState={setState} exportToXLSX={exportToXLSX} csvData={csvData}/>
        </div>,
        <div>
        <Button className="btn-add_new" size="small" key="1" type="primary">
          <Link to="/admin/categories/category-add">
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
        title="Categories | Categories Management"
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
