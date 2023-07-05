import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { forgotpassword, userLogin } from './authApis';

const initialState = {
  loading: false,
  isLogin: true,
  error: false,
  message: '',
  user: {},
  success:false,
};
export const UserLogin = createAsyncThunk('web/login', async (state,{rejectWithValue}) => {
  try {
    const response = await userLogin(state);
    if(response.data.data){
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('user',JSON.stringify(response.data.data.user))
    }
    return response;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const ForgotPassword = createAsyncThunk('forgot/password', async (state,{rejectWithValue}) => {
  try {
    const response = await forgotpassword(state);
    return response;
  } catch (error) {
    throw rejectWithValue(error);
  }
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
        console.log(action.payload);
        message.success('Successfuly Login')
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if(action.payload){
          state.message = action.payload.data.message;
          message.error(action.payload.data.message)
        }
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
        if(action.payload){
          state.message = action.payload.data.message;
          message.error(action.payload.data.message)
        }
      });
  },
});

export const { openProfile,UserLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
