import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getnotifications,
} from './notificationApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  Notifications:[]
};
export const getNotifications = createAsyncThunk('get/getNotifications', async () => {
  const response = await getnotifications();
  return response;
});


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
        state.Notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });

  },
});

// export const { } = salonSlice.actions

export default NotificationsSlice.reducer;
