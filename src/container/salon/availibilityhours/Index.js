import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Form, Select } from 'antd';
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
import {
  deleteAvailibilityHours,
  getAvailibilityHourbysalon,
  getAvailibilityHours,
  getSalons,
} from '../../../redux/salon/salonSlice';
import { exportToXLSX, handlePrint, getColumnSearchProps } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';

const { Option } = Select;
const ViewPage = () => {
  const dispatch = useDispatch();
  const { salonState, isLoading } = useSelector((state) => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.isLoading,
    };
  });
  const [form] = Form.useForm();
  const dataSource = [];
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
  const [pageSize, setPageSize] = useState(8);
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
  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
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
        availhour,
      });
    });
  const csvData = [['id', 'weekday', 'opening_time', 'closing_time', 'updated_at']];
  state.selectedRows.map((rows) => {
    const { id, weekday, opening_time, closing_time, updated_at } = rows.availhour;
    return csvData.push([id, weekday, opening_time, closing_time, updated_at]);
  });
  const columns = [
    {
      title: 'Day',
      dataIndex: 'weekday',
      key: 'weekday',
      sorter: (a, b) => a.weekday.length - b.weekday.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps(
        'Day',
        'weekday',
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
      render: (text) => moment(text).fromNow(),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  useEffect(() => {
    dispatch(getSalons());
  }, []);
  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields
      dispatch(
        getAvailibilityHourbysalon({
          ...values,
        }),
      );
      // form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  const handlePrinter = () => {
    if (state.selectedRows.length) {
      handlePrint(dataSource, columns, 'Availibility hours', state);
    } else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  };
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
              <Link to="/admin/salon/availibility-hours-add">
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
        title="Availability Hours | Availability Hours Management"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              <Form name="multi-form" layout="vertical" style={{ width: '100%' }} form={form} onFinish={handleSubmit}>
                <Row gutter={30}>
                  <Col sm={10} xs={24} className="mb-25">
                    <Form.Item
                      name="salon_id"
                      label="Salon"
                      initialValue=""
                      rules={[{ required: true, message: 'Please select salon' }]}
                    >
                      <Select size="large" className="sDash_fullwidth-select">
                        <Option value="">Please Select</Option>
                        {salonState.approvedSalons &&
                          salonState.approvedSalons.length > 0 &&
                          salonState.approvedSalons?.map((salon) => <Option value={salon.id}>{salon.name}</Option>)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={10} xs={24} className="mb-25">
                    <Form.Item name="weekday" label="Day" initialValue="">
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
                      {isLoading ? 'Loading...' : 'Submit'}
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
