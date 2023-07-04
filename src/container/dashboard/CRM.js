import React, { Suspense, useEffect, lazy } from 'react';
import { Row, Col, Skeleton, Select } from 'antd';
// import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { CardBarChart2, EChartCard } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { ChartjsBarChartTransparent } from '../../components/charts/chartjs';
// import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
// import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { getDashboard} from '../../redux/salon/salonSlice';

const UserListTable = lazy(() => import('./usertable'));
const TotalRevenue = lazy(() => import('./TotalRevenue'));
const { Option } = Select;
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
  const handleSubmit = (value) => {
    try {
      dispatch(getDashboard(value));
    } catch (error) {
      console.log('Validation error:', error);
    }
  };
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  useEffect(() => {
    dispatch(getDashboard(''));
  }, []);
  return (
    <>
      <PageHeader
        ghost
        title="Dashboard | System overview"
        buttons={[
          <div key="1" className="page-header-actions">
            <Select defaultValue="" size="small" className="sDash_fullwidth-select" onSelect={handleSubmit}>
              <Option value="">Year</Option>
              {salonState.dashboard.totalYears &&(
                salonState.dashboard.totalYears.map((item)=><Option value={item}>{item}</Option>)
              )}
            </Select>
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
                      {salonState.dashboard?.yearlyBookings?.length>0? salonState.dashboard.yearlyBookings[0].yearly_bookings:"0"}
                    </Heading>
                    <span>Total Bookings</span>
                    <p>
                      <span className="growth-upward">
                        {salonState?.dashboard?.yearlyBookings?.length>0?salonState.dashboard.yearlyBookings[0].year:"No Bookings this Year"}
                      </span>
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
                      ${salonState?.dashboard?.yearlyEarnings?.length>0? salonState.dashboard.yearlyEarnings[0].yearly_earnings:"0"}
                    </Heading>
                    <span>Total earnings</span>
                    <p>
                      <span className="growth-upward">
                      {salonState?.dashboard?.yearlyEarnings?.length>0? salonState.dashboard.yearlyEarnings[0].year:"No Earnings this Year"}
                      </span>
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
                        label: 'Earnings',
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
                        Since last year
                      </span>
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
                        Since last year
                      </span>
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
              <UserListTable />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default CRM;
