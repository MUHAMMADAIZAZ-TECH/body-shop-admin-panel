import React, { useEffect, Suspense } from 'react';
import { Avatar, List, Row, Col, Skeleton, Steps, Spin } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { SettingWrapper } from '../../profile/myProfile/overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper, UserCard } from '../../styled';
import { getBooking } from '../../../redux/bookings/bookingSlice';
import Heading from '../../../components/heading/heading';

const ViewBooking = ({ match }) => {
  const dispatch = useDispatch();
  const { bookingStates, isLoading } = useSelector((state) => {
    return {
      bookingStates: state.bookingStates,
      isLoading: state.bookingStates.loading,
    };
  });
  const steps = [
    {
      title: 'Pending',
      content: 'First-content',
    },
    {
      title: 'InProgress',
      content: 'Second-content',
    },
    {
      title: 'Completed',
      content: 'Last-content',
    },
  ];
  const BookingStatus = (status) => {
    let ReturnStatus = null;

    if (status === 'pending') {
      ReturnStatus = 0;
    } else if (status === 'inProgress') {
      ReturnStatus = 1;
    } else if (status === 'completed') {
      ReturnStatus = 2;
    }
    return ReturnStatus;
  };
  useEffect(() => {
    dispatch(getBooking(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/admin/bookings/bookings-view">View All</Link>
          </Button>,
        ]}
        ghost
        title="Bookings | Bookings Management"
      />
      <Main>
        {isLoading ? (
          <div className="spin">
            <Spin />
          </div>
        ) : (
          <Row gutter={25}>
            <Col xxl={18} lg={16} md={14} xs={24}>
              <SettingWrapper>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active />
                    </Cards>
                  }
                >
                  <BasicFormWrapper>
                    <Cards title="Booking Details">
                      <div>Booking Status </div>
                      <div style={{ marginTop: 20 }} />
                      <Steps current={BookingStatus(bookingStates?.Booking?.booking_status)} items={steps} />
                      <div style={{ marginTop: 20 }} />
                      <List
                        header={<div>Booking ID #{bookingStates?.Booking?.id}</div>}
                        itemLayout="horizontal"
                        dataSource={[1]}
                        renderItem={() => (
                          <NavLink to={`/admin/services/edit/${bookingStates?.Booking?.serviceId}`}>
                            <List.Item
                              actions={[<div key="list-loadmore-edit">{bookingStates?.Booking?.servicePrice}$</div>]}
                            >
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={bookingStates?.Booking?.serviceImage}
                                    style={{
                                      borderRadius: '4px',
                                      width: '60px',
                                      height: '60px',
                                      lineHeight: '100px',
                                      textAlign: 'center',
                                    }}
                                  />
                                }
                                title={<a href="#">{bookingStates?.Booking?.serviceName}</a>}
                                description={bookingStates?.Booking?.service_description}
                              />
                            </List.Item>
                          </NavLink>
                        )}
                      />
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton active paragraph={{ rows: 10 }} />
                          </Cards>
                        }
                      >
                        <div style={{ display: 'flex' }}>
                          <Cards title="Payment">
                            <List
                              size="small"
                              dataSource={[1]}
                              renderItem={() => (
                                <>
                                  <List.Item
                                    actions={[
                                      <div key="list-loadmore-edit">
                                        {bookingStates.Booking?.is_paid === 0 ? 'Unpaid' : 'Paid'}
                                      </div>,
                                    ]}
                                  >
                                    Payment Status{' '}
                                  </List.Item>
                                  <List.Item actions={[<div key="list-loadmore-edit">Cash</div>]}>
                                    Payment Method Cash
                                  </List.Item>
                                  <List.Item
                                    actions={[<div key="list-loadmore-edit">{bookingStates?.Booking?.hints}</div>]}
                                  >
                                    Hint and Notes{' '}
                                  </List.Item>
                                </>
                              )}
                            />
                          </Cards>
                          <Cards title="Taxes">
                            <List
                              size="small"
                              dataSource={[1]}
                              renderItem={() => (
                                <>
                                  {bookingStates.Booking?.taxes?.map((item) => {
                                    return (
                                      <List.Item
                                        actions={[
                                          <div key="list-1">
                                            {item?.tax_percentage}
                                            {item?.tax_amount}
                                            {item?.type === 'percentage' ? '%' : ''}{' '}
                                          </div>,
                                        ]}
                                      >
                                        {item?.tax_name} Tax
                                      </List.Item>
                                    );
                                  })}
                                  <List.Item
                                    actions={[
                                      <div key="list-loadmore-edit">{bookingStates.Booking?.coupon?.code}</div>,
                                    ]}
                                  >
                                    Coupon Code
                                  </List.Item>
                                  <List.Item
                                    actions={[
                                      <div key="list-loadmore-edit">
                                        {bookingStates.Booking?.coupon?.discount_value}
                                        {bookingStates.Booking?.coupon?.type === 'percentage' ? '%' : '.0'}
                                      </div>,
                                    ]}
                                  >
                                    Coupon Discount
                                  </List.Item>
                                  <List.Item>Subtotal</List.Item>
                                  <List.Item
                                    actions={[
                                      <div key="list-loadmore-edit">{bookingStates.Booking?.total_amount}</div>,
                                    ]}
                                  >
                                    Total
                                  </List.Item>
                                </>
                              )}
                            />
                          </Cards>
                        </div>
                      </Suspense>
                    </Cards>
                  </BasicFormWrapper>
                </Suspense>
              </SettingWrapper>
            </Col>
            <Col xxl={6} lg={8} md={10} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar active paragraph={{ rows: 3 }} />
                  </Cards>
                }
              >
                <UserCard>
                  <div className="card user-card">
                    <Cards headless>
                      <figure>
                        <img src={bookingStates.Booking?.user_photo} alt={require(`../../../static/img/users/1.png`)} />
                      </figure>
                      <figcaption>
                        <div className="card__content">
                          <Heading className="card__name" as="h6">
                            <Link to="#">{bookingStates.Booking?.user_name}</Link>
                          </Heading>
                          <p className="card__designation">{bookingStates.Booking?.user_email}</p>
                        </div>
                        <div className="card__info">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="info-single">
                                {/* <Heading className="info-single__title" as="h2">
                                                                Address
                                                                </Heading> */}
                                <p className="card__designation">Address: {bookingStates.Booking?.user_address}</p>
                              </div>
                            </Col>
                            <Col xs={24}>
                              <div className="info-single">
                                <p className="card__designation">Contact: {bookingStates.Booking?.user_contact}</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </figcaption>
                    </Cards>
                  </div>
                </UserCard>
              </Suspense>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </Cards>
                }
              >
                <Cards title="Booking Date & Time">
                  <List
                    size="small"
                    dataSource={[1]}
                    renderItem={() => (
                      <>
                        <List.Item
                          actions={[
                            <div key="list-1">
                              {moment(bookingStates?.Booking?.booking_date).format('YYYY-MM-DD HH:mm:ss')}
                            </div>,
                          ]}
                        >
                          Booking At{' '}
                        </List.Item>
                        <List.Item
                          actions={[
                            <div key="list-2">
                              {moment(bookingStates?.Booking?.appointmentDate).format('YYYY-MM-DD')}
                            </div>,
                          ]}
                        >
                          Appointment Date
                        </List.Item>
                        <List.Item actions={[<div key="list-3">{bookingStates?.Booking?.startTime}</div>]}>
                          Start At
                        </List.Item>
                        <List.Item actions={[<div key="list-4">{bookingStates?.Booking?.service_duration}</div>]}>
                          Duration
                        </List.Item>
                      </>
                    )}
                  />
                </Cards>
              </Suspense>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </Cards>
                }
              >
                <Cards title="Address">
                  <List
                    size="small"
                    dataSource={[1]}
                    renderItem={() => <List.Item>Dummy Address {bookingStates?.Booking?.salon_address}</List.Item>}
                  />
                </Cards>
              </Suspense>
            </Col>
          </Row>
        )}
      </Main>
    </>
  );
};

ViewBooking.propTypes = {
  match: PropTypes.object,
};

export default ViewBooking;
