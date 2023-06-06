import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import Ecommerce from './ecommerce';
import Pages from './pages';
import Users from './users';
import Widgets from './widgets';
import Features from './features';
import Axios from './axios';
import Gallery from './gallery';
import withAdminLayout from '../../layout/withAdminLayout';

const Projects = lazy(() => import('./projects'));
const Calendars = lazy(() => import('../../container/Calendar'));
const Inbox = lazy(() => import('../../container/email/Email'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Firebase = lazy(() => import('./firebase'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Calendar = lazy(() => import('../../container/calendar/Calendar'));
// const FileManager = lazy(() => import('../../container/fileManager/FileManager'));
const Kanban = lazy(() => import('../../container/kanban/Index'));
const Task = lazy(() => import('../../container/task/Index'));
const Salon = lazy(() => import('./salon'));
const Categories = lazy(() => import('./categories'));
const Services = lazy(() => import('./services'));
const Bookings = lazy(() => import('./bookings'));
const Coupons = lazy(() => import('./coupons'));
const Faq = lazy(() => import('./faq'));
const Payments = lazy(() => import('./payments'));
const Earnings = lazy(() => import('./earnings'));
function Admin() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}`} component={Features} />
        <Route path={`${path}`} component={Axios} />
        <Route path={`${path}`} component={Salon} />
        <Route path={`${path}`} component={Categories} />
        <Route path={`${path}`} component={Services} />
        <Route path={`${path}`} component={Bookings} />
        <Route path={`${path}`} component={Coupons} />
        <Route path={`${path}`} component={Faq} />
        <Route path={`${path}`} component={Payments} />
        <Route path={`${path}`} component={Earnings} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/gallery`} component={Gallery} />
        <Route path={`${path}/project`} component={Projects} />
        <Route path={`${path}/calendar`} component={Calendars} />        
        <Route path={`${path}/app/kanban`} component={Kanban} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        <Route path={`${path}/firestore`} component={Firebase} />
        <Route path={`${path}/main/chat`} component={Chat} />
        <Route path={`${path}/profile/myProfile`} component={Myprofile} />
        <Route path={`${path}/app/to-do`} component={ToDo} />
        <Route path={`${path}/app/note`} component={Note} />
        <Route path={`${path}/app/task`} component={Task} />
        <Route path={`${path}/contact/list`} component={Contact} />
        <Route path={`${path}/contact/grid`} component={ContactGrid} />
        <Route path={`${path}/contact/addNew`} component={ContactAddNew} />
        <Route path={`${path}/app/calendar`} component={Calendar} />
        <Route path={`${path}/widgets`} component={Widgets} />
      </Suspense>
    </Switch>
  );
}

export default withAdminLayout(Admin);
