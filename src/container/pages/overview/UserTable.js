import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Avatar, Table } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { deleteSalon, getSalons, selectSalon } from '../../../redux/salon/salonSlice';

const avatarStyle = {
  borderRadius: '4px', // Adjust the border radius as per your preference
  width: '60px', // Adjust the width and height as per your preference
  height: '60px',
  lineHeight: '100px', // Vertically center the content
  textAlign: 'center', // Horizontally center the content
};
function UserListTable({data}) {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];
  const dataSource = [];
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
  users.map((user) => {
    const { id, name, designation, img, status } = user;

    return usersTableData.push({
      key: id,
      Image: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={require(`../../../${img}`)} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
            <span className="user-designation">San Francisco, CA</span>
          </figcaption>
        </div>
      ),
      Saloon: 'john@gmail.com',
      Address: 'Business Development',
      position: designation,
      joinDate: 'January 20, 2020',
      status: <span className={`status-text ${status}`}>{status}</span>,
      Actions: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="primary" to="#" shape="circle">
              <FeatherIcon icon="eye" size={16} />
            </Button>
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon" type="danger" to="#" shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    });
  });
  if (data.length)
  data?.map((salon, key) => {
      const { id, images, name, address } = salon;
      return dataSource.push({
        key: key + 1,
        images: (images && <Avatar style={avatarStyle} src={images[0]} size={60} />),
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
        salon
      });
    });

  // const usersTableColumns = [
  //   {
  //     title: 'User',
  //     dataIndex: 'user',
  //     key: 'user',
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
  //     title: 'Join Date',
  //     dataIndex: 'joinDate',
  //     key: 'joinDate',
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     key: 'status',
  //   },
  //   {
  //     title: 'Actions',
  //     dataIndex: 'action',
  //     key: 'action',
  //     width: '90px',
  //   },
  // ];
  // const usersTableColumns2 = [
  //   {
  //     title: 'Image',
  //     dataIndex: 'salon_owner',
  //     key: 'salon_owner',
  //   },
  //   {
  //     title: 'Saloon',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  //   {
  //     title: 'Actions',
  //     dataIndex: 'Actions',
  //     key: 'Actions',
  //   },
  // ];
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
  console.log(data)
  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
            dataSource={dataSource}
            columns={columns}
            pagination={{
              defaultPageSize: 4,
              total: dataSource.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}
UserListTable.propTypes = {
  data: PropTypes.array.isRequired,
  // Other prop validations...
};
export default UserListTable;
