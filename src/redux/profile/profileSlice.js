import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getMyprofile,updateMyProfile,ChangePassword } from './profileApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  MyProfile: null,
};


const MyProfileSlice = createSlice({
  name: 'MyProfileSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyprofile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyprofile.fulfilled, (state, action) => {
        state.loading = false;
        state.MyProfile = action.payload.data;
      })
      .addCase(getMyprofile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(ChangePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ChangePassword.fulfilled, (state,action) => {
        console.log(action.payload);
        state.loading = false;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMyProfile.fulfilled, (state) => {
        state.loading = false;
        state.service = null;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default MyProfileSlice.reducer;
