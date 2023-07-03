import React, { useState } from 'react';
import { Badge } from 'antd';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector,useDispatch } from 'react-redux';
import { AtbdTopDropdwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';
import { getNotifications } from '../../../redux/notification/notificationSlice';

function NotificationBox() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Initial current page
  // const [totalPages, setTotalPages] = useState(0); 
  const { rtl, NotificationStates } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      NotificationStates: state.NotificationStates,
    };
  });
  function renderThumb({ style, ...props }) {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

  function renderView({ style, ...props }) {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  }

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };
 
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1); // Increment the current page number
    dispatch(getNotifications({
          currentPage:currentPage + 1,
          pageSize:5
        }))
  };
  console.log(NotificationStates.Notifications);
  const content = (
    <AtbdTopDropdwon className="atbd-top-dropdwon">
      <Heading as="h5" className="atbd-top-dropdwon__title">
        <span className="title-text">Notifications</span>
        {/* <Badge className="badge-success" count={3} /> */}
      </Heading>
      <Scrollbars
        autoHeight
        autoHeightMax={380}
        autoHide
        renderThumbVertical={renderThumb}
        renderView={renderView}
        renderTrackVertical={renderTrackVertical}
      >
        <ul className="atbd-top-dropdwon__nav notification-list">
          {NotificationStates?.Notifications?.map((item) => (
            <li key={item.id}>
              <Link to="#">
                <div className="atbd-top-dropdwon__content notifications">
                  <div className="notification-icon bg-primary">
                    <FeatherIcon icon={item.type?'calendar':'share'} />
                  </div>
                  <div className="notification-content d-flex">
                    <div className="notification-text">
                      <Heading as="h5">
                        <span>{item.title}</span> {item.body}
                      </Heading>
                      <p>{moment(item.created_at).fromNow()}</p>
                    </div>
                    <div className="notification-status">
                      <Badge dot />
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}

          {/* <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li> */}
        </ul>
      </Scrollbars>
      <Link className="btn-seeAll" to="#" onClick={handleLoadMore}>
        see more
      </Link>
    </AtbdTopDropdwon>
  );

//  useEffect(()=>{
//   dispatch(getNotifications({
//     currentPage,
//     pageSize:5
//   }))
//  },[currentPage])
  return (
    <div className="notification">
      <Popover placement="bottomLeft" content={content} action="click" >
        <Badge dot offset={[-8, -5]}>
          <Link to="#" className="head-example" onClick={handleLoadMore}>
            <FeatherIcon icon="bell" size={20} />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
}

export default NotificationBox;
