// eslint-disable-next-line camelcase
import React, { useEffect, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Table, Spin, Avatar, Input, Space, Tag, Rate, Modal } from 'antd';
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
import { getSalons, deleteSalon, selectSalon } from '../../../redux/salon/salonSlice';

const avatarStyle = {
  borderRadius: '4px', // Adjust the border radius as per your preference
  width: '60px', // Adjust the width and height as per your preference
  height: '60px',
  lineHeight: '100px', // Vertically center the content
  textAlign: 'center', // Horizontally center the content
};
const ViewPage = () => {
  const dispatch = useDispatch();
  const { isLoading, salonState } = useSelector(state => {
    return {
      isLoading: state.AxiosCrud.loading,
      salonState: state.salonStates
    };
  });
  const dataSource = [];
  const [state, setState] = useState({
    selectedRowKeys: [],
    searchText: '',
    selectedRows: []
  });

  const { selectedRowKeys } = state;
  const [searchText, setSearchText] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
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
  // const checkOpeningHours = (openingHoursData) => {
  //   // Get the current day and time using Moment.js
  //   const currentDate = moment();
  //   const currentDay = currentDate.format('dddd');
  //   const currentTime = currentDate.format('HH:mm');
  //   // Find the opening hours for the current day
  //   const openingHours = openingHoursData.find(hours => hours.weekday === currentDay);

  //   if (openingHours) {
  //     const { closing_time, opening_time } = openingHours;

  //     // Check if the current time is within opening hours
  //     if (
  //       moment(currentTime, 'HH:mm').isBetween(
  //         moment(opening_time, 'HH:mm'),
  //         moment(closing_time, 'HH:mm'),
  //         null,
  //         '[]'
  //       ) || moment(currentTime, 'HH:mm').isBefore(moment(opening_time, 'HH:mm'))
  //     ) {
  //       return true
  //     } 
  //   } 
  // };

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (images) => {
    console.log(images)
    setPreviewOpen(true);
    setPreviewImages(images)
    setPreviewTitle('Saloon Images');
  };
  const handleDelete = id => {
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
    dispatch(selectSalon(salon))
    console.log(salon)
  }
  const onHandleSearch = (e) => {
    setState({ ...state, searchText: e.target.value });
  };
  if (salonState?.unapprovedSalons?.length)
    salonState?.unapprovedSalons?.map((salon, key) => {
      const { id, images, name, phone_number, mobile_number, address, ratings_average, availability_range, updated_at, isActive } = salon;
      return dataSource.push({
        key: key + 1,
        images: (images && <Avatar style={avatarStyle} src={images[0]} size={60} onClick={() => handlePreview(salon.images)} />),
        name,
        phone_number,
        mobile_number,
        address,
        ratings_average: (<Rate disabled defaultValue={ratings_average} />),
        availability_range,
        isActive: <Tag className='complete'>{isActive === 1 ? 'yes' : "no"}</Tag>,
        // closed:checkOpeningHours(availability_hours)?'open':'closed',
        updated_at,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/admin/salon/edit/${id}`} onClick={() => handleEdit(salon)}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link>
          </div>
        ),
        salon
      });
    });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
      // render: text => <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>,

    },
    {
      title: 'Phone no',
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('phone_number'),
    },
    {
      title: 'Mobile no',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
      sorter: (a, b) => a.mobile_number.length - b.mobile_number.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('mobile_number'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Rating',
      dataIndex: 'ratings_average',
      key: 'ratings_average',
      sorter: (a, b) => a.ratings_average.length - b.ratings_average.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('ratings_average'),
    },
    {
      title: 'Availibility Range',
      dataIndex: 'availability_range',
      key: 'availability_range',
      align: 'center',
      sorter: (a, b) => a.availability_range.length - b.availability_range.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('availability_range'),
      render: text => <div>{text} km</div>,
    },
    {
      title: 'Active status',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      sorter: (a, b) => a.isActive.length - b.isActive.length,
      sortDirections: ['descend', 'ascend'],
    },
    // {
    //   title: 'Closed',
    //   dataIndex: 'closed',
    //   key: 'closed',
    //   align: 'center',
    //   sorter: (a, b) => a.isActive.length - b.isActive.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: 'center',
      sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      sortDirections: ['descend', 'ascend'],
      render: text => moment(text).fromNow(),
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
    dispatch(getSalons())
  }, [])

  return (
    <RecordViewWrapper>
      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/admin/salon/salon-add">
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
        title="Salons | Salons Management"
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
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        {previewImages?.map((image, key) => {
          return (
            <div>
              <img
                key={key}
                alt="example"
                style={{
                  width: '100%',
                }}
                src={image}
              />
            </div>
          )})}

      </Modal>
    </RecordViewWrapper>
  );
};

export default ViewPage;
