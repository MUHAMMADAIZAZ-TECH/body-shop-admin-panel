import React,{ useEffect } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import Notification from './notification';
import { Popover } from '../../popup/popup';
import { getMyprofile } from '../../../redux/profile/profileApis';
import { UserLogout } from '../../../redux/authentication/authenticationSlice';
import Heading from '../../heading/heading';

function AuthInfo() {
  const dispatch = useDispatch();
  const { MyProfileStates} = useSelector((state) => {
    return {
      MyProfileStates: state.MyProfileStates.MyProfile
    };
  });
  const SignOut = (e) => {
    e.preventDefault();
    dispatch(UserLogout());
  };
  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          {MyProfileStates?.photo && <Avatar src={MyProfileStates?.photo} size={50} 
          alt={require('../../../static/img/avatar/chat-auth.png')}
          className='profile-image' />}
          <figcaption>
            <Heading as="h5">{MyProfileStates?.fullName && MyProfileStates?.fullName}</Heading>
            <p>{MyProfileStates?.email}</p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="/admin/profile/view">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="/admin/profile/change-password">
              <FeatherIcon icon="lock" /> Change Password
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

    useEffect(()=>{
      dispatch(getMyprofile())
    },[])
  return (
    <InfoWraper>
      <Notification />
      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
          {MyProfileStates?.photo && <Avatar src={MyProfileStates?.photo} alt='https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'/>}
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
}

export default AuthInfo;
