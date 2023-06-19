import React, { useEffect, useState ,useRef} from 'react';
import { Row, Col, Table, Spin,Input, Space,Form ,Select} from 'antd';
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
import { deleteAvailibilityHours, getAvailibilityHourbysalon, getAvailibilityHours, getSalons } from '../../../redux/salon/salonSlice';

const { Option } = Select;
const ViewPage = () => {
  const dispatch = useDispatch();
  const { salonState } = useSelector(state => {
    return {
      salonState: state.salonStates,
    };
  });
  const [form] = Form.useForm();
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
  console.log(salonState?.availibilityhoursBysalon);
  if (salonState?.availibilityhoursBysalon?.length)
  salonState?.availibilityhoursBysalon?.map((availhour, key) => {
      const { id, weekday, opening_time, closing_time, updated_at } = availhour;
      return dataSource.push({
        key: key + 1,
        weekday,
        opening_time,
        closing_time,
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
    dispatch(getSalons())
  },[])
  const handleSubmit = async values => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(getAvailibilityHourbysalon({ 
       ...values,
      }));
        // form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
   
  };
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
        ghost
        title="Availability Hours | Availability Hours Management"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
            <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col sm={10} xs={24} className="mb-25">
                    <Form.Item name="salon_id" label="Salon" initialValue="" rules={[{ required: true, message: 'Please select salon' }]} >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          {salonState.approvedSalons && salonState.approvedSalons.length>0 && salonState.approvedSalons?.map((salon)=><Option value={salon.id}>{salon.name}</Option>) }
                        </Select>
                      </Form.Item>
                      </Col>
                    <Col sm={10} xs={24} className="mb-25">
                    <Form.Item name="weekday" label="Day" initialValue="" >
                        <Select size="large" className="sDash_fullwidth-select">
                          <Option value="">Please Select</Option>
                          <Option value="Sunday">Sunday</Option>
                          <Option value="Monday">Monday</Option>
                          <Option value="Tuesday">Tuesday</Option>
                          <Option value="Wednesday">Wednesday</Option>
                          <Option value="Thursday">Thursday</Option>
                          <Option value="Friday">Friday</Option>
                          <Option value="Saturday">Saturday</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={2} xs={24} className="mb-25 mt-25">
                      <Button size="default" htmlType="Save" type="primary">
                        {/* {isLoading ? 'Loading...' : 'Submit'} */}
                        Search
                      </Button>
                    </Col>
                    <Col sm={2} xs={24} className="mb-25 mt-25">
                      <Button
                        className="btn-cancel"
                        size="large"
                        onClick={() => {
                          return form.resetFields();
                        }}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
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
