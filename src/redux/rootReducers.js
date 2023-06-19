import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import themeUsersReducer from './themeUsers/reducers';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import authenticationSlice from './authentication/authenticationSlice';
import salonSlice from './salon/salonSlice';
import categorySlice from './categories/categoriesSlice';
import servicesSlice from './services/servicesSlice';
import couponSlice from './coupons/couponSlice';
import transactionSlice from './transactions/transactionSlice';
import bookingSlice from './bookings/bookingSlice';
import faqSlice from './faq/faqSlice';

const rootReducers = combineReducers({
  fb: firebaseReducer,
  fs: firestoreReducer,
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  ChangeLayoutMode,
  authenticationStates:authenticationSlice,
  salonStates:salonSlice,
  categoryStates:categorySlice,
  servicesStates:servicesSlice,
  couponStates:couponSlice,
  transactionStates:transactionSlice,
  bookingStates:bookingSlice,
  faqStates:faqSlice

});

export default rootReducers;
