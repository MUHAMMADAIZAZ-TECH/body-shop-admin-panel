import { createSlice } from '@reduxjs/toolkit';
import {
  getNotifications,
} from './notificationApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  Notifications:[]
};

const NotificationsSlice = createSlice({
  name: 'NotificationsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Notifications = [...new Set([...state.Notifications,...action.payload.data])];
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

// export const { } = salonSlice.actions

export default NotificationsSlice.reducer;
