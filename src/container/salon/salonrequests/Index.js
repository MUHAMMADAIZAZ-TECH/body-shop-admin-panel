// eslint-disable-next-line camelcase
import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Spin, Avatar, Tag, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './Style';
import { Main, TableWrapper } from '../../styled';
import ImagePreviewModal from '../../../components/modals/my-modal';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { alertModal } from '../../../components/modals/antd-modals';
import { getSalons, deleteSalon, selectSalon } from '../../../redux/salon/salonSlice';
import { exportToXLSX, handlePrint, getColumnSearchProps } from '../../../components/utilities/utilities';
import MYExportButton from '../../../components/buttons/my-export-button/my-export-button';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { salonState, isLoading } = useSelector(state => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.loading
    };
  });
  const dataSource = [];
  const [searchText, setSearchText] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
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

  const handleCancelpreview = () => setPreviewOpen(false);
  const handlePreview = async (images) => {
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
        images: (images && <Avatar className='myavatar' src={images[0]} size={60} onClick={() => handlePreview(salon.images)} />),
        name,
        phone_number,
        mobile_number,
        address,
        ratings_average,
        availability_range,
        isActive,
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
      ...getColumnSearchProps('Name', 'name', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
      // render: text => <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>,

    },
    {
      title: 'Phone no',
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Phone no', 'phone_number', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Mobile no',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
      sorter: (a, b) => a.mobile_number.length - b.mobile_number.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Mobile no', 'mobile_number', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('Address', 'address', handleSearch, handleReset, searchInput, searchedColumn, searchText, setSearchText, setSearchedColumn),
    },
    {
      title: 'Rating',
      dataIndex: 'ratings_average',
      key: 'ratings_average',
      sorter: (a, b) => a.ratings_average.length - b.ratings_average.length,
      sortDirections: ['descend', 'ascend'],
      render: (text) => <Rate disabled defaultValue={text} />
    },
    {
      title: 'Availibility Range',
      dataIndex: 'availability_range',
      key: 'availability_range',
      align: 'center',
      sorter: (a, b) => a.availability_range.length - b.availability_range.length,
      sortDirections: ['descend', 'ascend'],
      render: text => <div>{text} km</div>,
    },
    {
      title: 'Active status',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      sorter: (a, b) => a.isActive.length - b.isActive.length,
      sortDirections: ['descend', 'ascend'],
      render: (isActive) => <Tag className='complete'>{isActive === 1 ? 'yes' : "no"}</Tag>
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
      sorter: (a, b) => a.isActive.length - b.isActive.length,
      sortDirections: ['descend', 'ascend'],
      render: text => moment(text).fromNow(),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const csvData = [['id', 'name', 'phone_number', 'mobile_number', 'address',
    'ratings_average', 'availability_range', 'isActive', 'updated_at']];
  state.selectedRows.map((rows) => {
    const { id, name, phone_number, mobile_number, address, ratings_average, availability_range,
      isActive, updated_at } = rows.salon;
    return csvData.push([id, name, phone_number, mobile_number, address, ratings_average, availability_range,
      isActive, updated_at]);
  });

  const handlePrinter = () => {
    if (state.selectedRows.length) {
      handlePrint(dataSource, columns, 'Salons', state)
    }
    else {
      alertModal.warning({
        title: 'Please Select your Required Rows!',
      });
    }
  }
  useEffect(() => {
    dispatch(getSalons())
  }, [])

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
              <Link to="/admin/salon/salon-add">
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
      <ImagePreviewModal
        open={previewOpen}
        title={previewTitle}
        images={previewImages}
        onCancel={handleCancelpreview}
      />
    </RecordViewWrapper>
  );
};

export default ViewPage;
