import React, { Suspense, useEffect, lazy } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { CardBarChart2, EChartCard } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { ChartjsBarChartTransparent } from '../../components/charts/chartjs';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { getSalons, getDashboard } from '../../redux/salon/salonSlice';

const UserListTable = lazy(() => import('./usertable'));
const TotalRevenue = lazy(() => import('./TotalRevenue'));
const chartOptions = {
  legend: {
    display: false,
    labels: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,

        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

function CRM() {
  const dispatch = useDispatch();
  const { salonState } = useSelector((state) => {
    return {
      salonState: state.salonStates,
    };
  });
  console.log(salonState);
  const earningdatasets = (array) => {
    if (array) {
      const seperated = array?.map((item) => Number(item.monthly_earnings))
      return seperated
    }
    return []

  }
  const bookingsdatasets = (array) => {
    if (array) {
      const seperated = array?.map((item) => Number(item.monthly_bookings))
      return seperated
    }
    return []

  }
  const salonsdatasets = (array) => {
    if (array) {
      const seperated = array?.map((item) => Number(item.monthly_salons))
      return seperated
    }
    return []

  }
  const userdatasets = (array) => {
    if (array) {
      const seperated = array?.map((item) => Number(item.monthly_users))
      return seperated
    }
    return []

  }
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getSalons());
  }, []);
  return (
    <>
      <PageHeader
        ghost
        title="Dashboard | System overview"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">
                      {salonState.dashboard.totalBookings && salonState.dashboard.totalBookings}
                    </Heading>
                    <span>Total Bookings</span>
                    <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p>
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={month}
                    datasets={[
                      {
                        data: bookingsdatasets(salonState?.dashboardDetails),
                        backgroundColor: '#EFEFFE',
                        hoverBackgroundColor: '#5F63F2',
                        label: 'Bookings',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">
                      ${salonState.dashboard.totalEarnings && salonState.dashboard.totalEarnings}
                    </Heading>
                    <span>Total earnings</span>
                    <p>
                      <span className="growth-downward">
                        <FeatherIcon icon="arrow-down" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p>
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={month}
                    datasets={[
                      {
                        data: earningdatasets(salonState?.dashboardDetails),
                        backgroundColor: '#FFF0F6',
                        hoverBackgroundColor: '#FF69A5',
                        label: 'Revenue',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{salonState.dashboard.totalSalons && salonState.dashboard.totalSalons}</Heading>
                    <span>Salons</span>
                    <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p>
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={month}
                    datasets={[
                      {
                        data: salonsdatasets(salonState?.dashboardDetails),
                        backgroundColor: '#E8FAF4',
                        hoverBackgroundColor: '#20C997',
                        label: 'Salons Registered',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">
                      {salonState.dashboard.totalCustomers && salonState.dashboard.totalCustomers}
                    </Heading>
                    <span>Total Customers</span>
                    <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p>
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={month}
                    datasets={[
                      {
                        data: userdatasets(salonState?.dashboardDetails),
                        backgroundColor: '#E9F5FF',
                        hoverBackgroundColor: '#2C99FF',
                        label: 'User Registerd',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <TotalRevenue title="Earnings" DashboardData={salonState.dashboard} />
            </Suspense>
          </Col>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <UserListTable data={salonState?.approvedSalons} />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default CRM;
