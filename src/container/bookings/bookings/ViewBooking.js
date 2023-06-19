import React, { useEffect, Suspense } from 'react';
import { Avatar, List, Row, Col, Skeleton, Steps } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { SettingWrapper } from '../../profile/myProfile/overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { getBooking } from '../../../redux/bookings/bookingSlice';
// import UserCards from '../../pages/overview/UserCard';

const ViewBooking = ({ match }) => {
    const dispatch = useDispatch();
    const { bookingStates } = useSelector(state => {
        return { bookingStates: state.bookingStates };
    });
    console.log(bookingStates.Booking);
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
        }
        else if (status === 'inProgress') {
            ReturnStatus = 1;
        }
        else if (status === 'completed') {
            ReturnStatus = 2;
        }
        return ReturnStatus;
    }
    useEffect(() => {
        dispatch(getBooking(match.params.id))
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
                                                <List.Item
                                                    actions={[<div key="list-loadmore-edit">{bookingStates?.Booking?.servicePrice}$</div>]}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={bookingStates?.Booking?.serviceImage} style={{
                                                            borderRadius: '4px',
                                                            width: '60px',
                                                            height: '60px',
                                                            lineHeight: '100px',
                                                            textAlign: 'center',
                                                        }} />}
                                                        title={<a href="#">{bookingStates?.Booking?.serviceName}</a>}
                                                        description="This is very good service"
                                                    />
                                                </List.Item>
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
                                                                <List.Item actions={[<div key="list-loadmore-edit">{bookingStates.Booking?.is_paid === 0 ? 'Unpaid' : 'Paid'}</div>]}>Payment Status </List.Item>
                                                                <List.Item actions={[<div key="list-loadmore-edit">Cash</div>]}>Payment Method Cash</List.Item>
                                                                <List.Item actions={[<div key="list-loadmore-edit">Description Required</div>]}>Hint and Notes </List.Item>
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
                                                                <List.Item actions={[<div key="list-loadmore-edit">{bookingStates.Booking?.tax?.tax_percentage} {bookingStates.Booking?.tax?.type === 'percentage' ? '%' : ''}</div>]}>{bookingStates.Booking?.tax?.tax_name} Tax</List.Item>
                                                                <List.Item actions={[<div key="list-loadmore-edit">{bookingStates.Booking?.coupon?.code}</div>]}>Coupon Code</List.Item>
                                                                <List.Item actions={[<div key="list-loadmore-edit">{bookingStates.Booking?.coupon?.discount_value}{bookingStates.Booking?.coupon?.type === 'percentage' ? '%' : '.0'}</div>]}>Coupon Discount</List.Item>
                                                                <List.Item>Subtotal</List.Item>
                                                                <List.Item actions={[<div key="list-loadmore-edit">{bookingStates.Booking?.total_amount}</div>]}>Total</List.Item>
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
                            {/* <UserCards
                                user={{ name: bookingStates?.Booking?.user_name, designation: bookingStates?.Booking?.user_contact, img: 'static/img/users/1.png' }}
                            /> */}
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
                                            <List.Item actions={[<div key="list-loadmore-edit">{moment(bookingStates?.Booking?.booking_date).format('YYYY-MM-DD HH:mm:ss')}</div>]}>Booking At </List.Item>
                                            <List.Item actions={[<div key="list-loadmore-edit">{moment(bookingStates?.Booking?.appointmentDate).format('YYYY-MM-DD')}</div>]}>Appointment Date</List.Item>
                                            <List.Item actions={[<div key="list-loadmore-edit">{bookingStates?.Booking?.startTime}</div>]}>Start At</List.Item>
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
                                    renderItem={() => (
                                        <List.Item>Dummy Address {bookingStates?.Booking?.salon_address}</List.Item>
                                    )}
                                />
                            </Cards>
                        </Suspense>
                    </Col>

                </Row>
            </Main>
        </>
    );
};

ViewBooking.propTypes = {
    match: PropTypes.object,
};

export default ViewBooking;
