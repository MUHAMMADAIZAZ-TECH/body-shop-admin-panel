import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { userLogin } from './authApis';

const initialState = {
  loading: false,
  isLogin: true,
  error: false,
  message: '',
  user: {},
};
export const UserLogin = createAsyncThunk('web/login', async (state) => {
  const response = await userLogin(state);
  return response;
});
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    openProfile: (state, action) => {
      state.opencommentsection = action.payload;
    },
    UserLogout: (state)=>{
      localStorage.clear()
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
        state.isLogin = false;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action?.payload?.data?.user;
        state.message = action.payload.message;
        message.success('Successfuly Login')
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });
  },
});

export const { openProfile,UserLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
