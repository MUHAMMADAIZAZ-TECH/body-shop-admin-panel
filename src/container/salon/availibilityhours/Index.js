import React, { useEffect, useState ,useRef} from 'react';
import { Row, Col, Table, Spin,Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { deleteAvailibilityHours, getAvailibilityHours } from '../../../redux/salon/salonSlice';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { salonState } = useSelector(state => {
    return {
      salonState: state.salonStates
    };
  });
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteAvailibilityHours({
          id,
          getData: () => {
            dispatch(getAvailibilityHours());
          },
        }),
      );
    }
    return false;
  };

  const onHandleSearch = e => {
    console.log(e.target.value)
  };

  if (salonState?.availibilityhours?.data?.length)
  salonState?.availibilityhours?.data?.map((availhour, key) => {
      const { id, weekday, opening_time, closing_time, salon_name, updated_at } = availhour;
      return dataSource.push({
        key: key + 1,
        weekday,
        opening_time,
        closing_time,
        salon_name,
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/salon/availibility-hours/edit/${id}`}>
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
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
          text
        ),
    });
  const columns = [
    {
      title: 'Day',
      dataIndex: 'weekday',
      key: 'weekday',
      sorter: (a, b) => a.weekday.length - b.weekday.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('weekday')
    },
    {
      title: 'Start At',
      dataIndex: 'opening_time',
      key: 'opening_time',
    },
    {
      title: 'End At',
      dataIndex: 'closing_time',
      key: 'closing_time',
    },
    {
      title: 'Salon',
      dataIndex: 'salon_name',
      key: 'salon_name',
      sorter: (a, b) => a.salon_name.length - b.salon_name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('salon_name')
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
  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(()=>{
    dispatch(getAvailibilityHours())
  },[])
  return (
    <RecordViewWrapper>
      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/salon/availibility-hours-add">
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
        title="Availability Hours | Availability Hours Management"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {false ? (
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
