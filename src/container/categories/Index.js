import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import {
  axiosDataRead,
  axiosDataSearch,
  axiosDataDelete,
  axiosCrudGetData,
} from '../../redux/crud/axios/actionCreator';
import { getCategories } from '../../redux/categories/categoriesSlice';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { crud, isLoading ,categoryStates} = useSelector(state => {
    return {
      crud: state.AxiosCrud.data,
      isLoading: state.AxiosCrud.loading,
      categoryStates: state.categoryStates
    };
  });
  console.log(categoryStates)
  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;

  useEffect(() => {
    if (axiosDataRead) {
      dispatch(axiosDataRead());
    }
  }, [dispatch]);
  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        axiosDataDelete({
          id,
          getData: () => {
            dispatch(axiosCrudGetData());
          },
        }),
      );
    }
    return false;
  };

  const onHandleSearch = e => {
    dispatch(axiosDataSearch(e.target.value, crud));
  };

  if (crud.length)
    crud.map((person, key) => {
      const { id, name, email, company, position, join, status, city, country, image } = person;
      return dataSource.push({
        key: key + 1,
        name: (
          <div className="record-img align-center-v">
            <img
              src={
                image ? process.env.REACT_APP_BASE_URL + image : require('../../static/img/avatar/profileImage.png')
              }
              alt={id}
            />
            <span>
              <span>{name}</span>
              <span className="record-location">{city && country ? `${city},${country}` : ''}</span>
            </span>
          </div>
        ),
        email,
        company,
        position,
        jdate: join,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/salon/salon/edit/${id}`}>
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

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email',
  //     key: 'email',
  //   },
  //   {
  //     title: 'Company',
  //     dataIndex: 'company',
  //     key: 'company',
  //   },
  //   {
  //     title: 'Position',
  //     dataIndex: 'position',
  //     key: 'position',
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     key: 'status',
  //   },
  //   {
  //     title: 'Joining Date',
  //     dataIndex: 'jdate',
  //     key: 'jdate',
  //   },
  //   {
  //     title: 'Actions',
  //     dataIndex: 'action',
  //     key: 'action',
  //     width: '90px',
  //   },
  // ];
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Parent Category',
      dataIndex: 'parent_category',
      key: 'parent_category',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
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
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  return (
    <RecordViewWrapper>
      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/categories/category-add">
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
                      dataSource={categoryStates.categories}
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
