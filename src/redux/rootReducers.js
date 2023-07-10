import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import themeUsersReducer from './themeUsers/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import authenticationSlice from './authentication/authenticationSlice';
import salonSlice from './salon/salonSlice';
import categorySlice from './categories/categoriesSlice';
import servicesSlice from './services/servicesSlice';
import couponSlice from './coupons/couponSlice';
import transactionSlice from './transactions/transactionSlice';
import bookingSlice from './bookings/bookingSlice';
import faqSlice from './faq/faqSlice';
import chartContentReducer from './chartContent/reducers';
import settingsSlice from './settings/settingsSlice';
import MyProfileSlice from './profile/profileSlice'
import notificationSlice from './notification/notificationSlice';

const rootReducers = combineReducers({
  fb: firebaseReducer,
  fs: firestoreReducer,
  themeUsers: themeUsersReducer,
  ChangeLayoutMode,
  authenticationStates: authenticationSlice,
  salonStates: salonSlice,
  categoryStates: categorySlice,
  servicesStates: servicesSlice,
  couponStates: couponSlice,
  transactionStates: transactionSlice,
  bookingStates: bookingSlice,
  faqStates: faqSlice,
  settingStates: settingsSlice,
  chartContent: chartContentReducer,
  MyProfileStates: MyProfileSlice,
  NotificationStates: notificationSlice
});

export default rootReducers;
