import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ForgotPassword, UserLogin } from './authApis';

const initialState = {
  loading: false,
  isLogin: true,
  error: false,
  message: '',
  user: {},
  success:false,
};

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
        console.log(action.payload);
        message.success('Successfuly Login')
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(ForgotPassword.pending, (state) => {
        state.loading = true;
        state.isLogin = false;
        state.error = null;
      })
      .addCase(ForgotPassword.fulfilled, (state,action) => {
        state.loading = false;
        state.isLogin = true;
        if(action.payload.status && action.payload.status==="success"){
          message.success('Successfuly Updated')
          state.success = true;
        }
        else{
          message.success('Something went wrong')
          state.success = false;
        }
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
  },
});

export const { openProfile,UserLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
