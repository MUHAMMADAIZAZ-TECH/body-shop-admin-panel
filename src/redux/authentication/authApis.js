import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const UserLogin = createAsyncThunk('web/login', async (state,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/users/admin-login`, {
      email: state.username,
      password: state.password,
    });
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
    const response = await DataService.patch(`/api/v1/users/forgetpassword/admin`,state);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});