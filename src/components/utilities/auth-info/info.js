import React from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import Notification from './notification';
import { Popover } from '../../popup/popup';
// import { Dropdown } from '../../dropdown/dropdown';
import { UserLogout } from '../../../redux/authentication/authenticationSlice';
import Heading from '../../heading/heading';

function AuthInfo() {
  const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   flag: 'english',
  // });
  // const { flag } = state;
  const user = JSON.parse(localStorage.getItem('user'))
  const SignOut = (e) => {
    e.preventDefault();
    dispatch(UserLogout());
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" />
          <figcaption>
            <Heading as="h5">{user.fullName && user.fullName}</Heading>
            <p>{user.email}</p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Languages
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  // const onFlagChangeHandle = (value) => {
  //   setState({
  //     ...state,
  //     flag: value,
  //   });
  // };

  // const country = (
  //   <NavAuth>
  //     <Link onClick={() => onFlagChangeHandle('english')} to="#">
  //       <img src={require('../../../static/img/flag/english.png')} alt="" />
  //       <span>English</span>
  //     </Link>
  //     <Link onClick={() => onFlagChangeHandle('germany')} to="#">
  //       <img src={require('../../../static/img/flag/germany.png')} alt="" />
  //       <span>Germany</span>
  //     </Link>
  //     <Link onClick={() => onFlagChangeHandle('spain')} to="#">
  //       <img src={require('../../../static/img/flag/spain.png')} alt="" />
  //       <span>Spain</span>
  //     </Link>
  //     <Link onClick={() => onFlagChangeHandle('turky')} to="#">
  //       <img src={require('../../../static/img/flag/turky.png')} alt="" />
  //       <span>Turky</span>
  //     </Link>
  //   </NavAuth>
  // );

  return (
    <InfoWraper>
      {/* <Message /> */}
      <Notification />

      {/* <Settings /> */}
      {/* <Support /> */}
      {/* <div className="nav-author">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="head-example">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div> */}

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
}

export default AuthInfo;
