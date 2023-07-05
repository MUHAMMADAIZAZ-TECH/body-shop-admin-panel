import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Avatar, Table } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from './style';
import { TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { selectSalon } from '../../redux/salon/salonSlice';
import { deleteSalon, getSalons } from '../../redux/salon/salonApis';

const avatarStyle = {
  borderRadius: '4px', // Adjust the border radius as per your preference
  width: '60px', // Adjust the width and height as per your preference
  height: '60px',
  lineHeight: '100px', // Vertically center the content
  textAlign: 'center', // Horizontally center the content
};
function UserListTable() {
  const dispatch = useDispatch();
  const { salonState } = useSelector((state) => {
    return {
      salonState: state.salonStates,
      isLoading: state.salonStates.loading,
    };
  });
  const dataSource = [];
  const [currentPage, setCurrentPage] = useState(1); // Initial current page
  const [totalPages, setTotalPages] = useState(0); 
  const [pageSize, setPageSize] = useState(4);
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(
        deleteSalon({
          id,
          getData: () => {
            dispatch(getSalons({
              currentPage,
              pageSize,
              setTotalPages,
              approved:1
            }));
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
  if (salonState?.salons?.length)
  salonState?.salons?.map((salon, key) => {
      const { id, images, name, address } = salon;
      return dataSource.push({
        key: key + 1,
        images: images && <Avatar style={avatarStyle} src={images[0]} size={60} />,
        name,
        address,
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
        salon,
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
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  useEffect(() => {
    dispatch(getSalons({
      currentPage,
      pageSize,
      setTotalPages,
      approved:1
    }));
  }, [currentPage, pageSize]);
  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              // pageSize,
              total: totalPages * pageSize,
              // showSizeChanger: true ,
              // pageSizeOptions: ['10', '25', '50', '100'], 
              onShowSizeChange: handlePageSizeChange,
              current: currentPage,
              onChange: setCurrentPage,
              defaultPageSize: 4,
              // total: dataSource.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default UserListTable;
