import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getmyprofile,updatemyprofile } from './profileApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  MyProfile: null,
};

export const getMyprofile = createAsyncThunk('get/getMyprofile', async () => {
  const response = await getmyprofile();
  return response;
});

export const updateMyProfile = createAsyncThunk('patch/updateMyProfile', async (body) => {
  const response = await updatemyprofile(body);
  return response;
});


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
        state.error = action.error;
        state.message = action.error.message;
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
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default MyProfileSlice.reducer;
