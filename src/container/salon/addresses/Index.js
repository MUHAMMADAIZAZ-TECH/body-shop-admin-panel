// eslint-disable-next-line camelcase
import React, { useEffect, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Table, Spin, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { selectSalon } from '../../../redux/salon/salonSlice';
import { getSalons, deleteSalon, } from '../../../redux/salon/salonApis';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { salonState, isLoading } = useSelector((state) => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.loading,
    };
  });
  const dataSource = [];
  const [state, setState] = useState({
    selectedRowKeys: [],
    searchText: '',
    selectedRows: [],
  });

  const { selectedRowKeys } = state;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        // onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        <div style={{ width: 'auto', wordWrap: 'break-word', whiteSpace: 'normal' }}>{text}</div>
      ),
  });
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteSalon({
          id,
          getData: () => {
            dispatch(getSalons());
          },
        }),
      );
    }
    return false;
  };
  const handleEdit = (salon) => {
    dispatch(selectSalon(salon));
    console.log(salon);
  };
  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
  };
  if (salonState?.approvedSalons?.length)
    salonState?.approvedSalons?.map((salon, key) => {
      const { id, description, address, user_id, updated_at } = salon;
      return dataSource.push({
        key: key + 1,
        description,
        address,
        user_id,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/salon/address/edit/${id}`} onClick={() => handleEdit(salon)}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        salon,
      });
    });

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('description'),
      width: 400,
      ellipsis: true,
      render: (text) => <div style={{ width: 'auto', wordWrap: 'break-word', whiteSpace: 'normal' }}>{text}</div>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      width: 400,
      ellipsis: true,
      render: (text) => <div style={{ width: 'auto', wordWrap: 'break-word', whiteSpace: 'normal' }}>{text}</div>,
    },
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: (a, b) => a.user_id.length - b.user_id.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('user_id'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: 'center',
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => moment(text).fromNow(),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const onSelectChange = (selectedRowKey, rows) => {
    setState({ ...state, selectedRowKeys: selectedRowKey, selectedRows: rows });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    dispatch(getSalons());
  }, []);

  return (
    <RecordViewWrapper>
      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/salon/address-add">
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
        title="Addresses | Addresses Management"
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
                      dataSource={[]}
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
