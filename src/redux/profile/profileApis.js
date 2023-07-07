import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getMyprofile = createAsyncThunk('get/getMyprofile', async (body,{rejectWithValue}) => {
  console.log('profile');
  try {
    const { data } = await DataService.get(`/api/v1/users/admin`);
    console.log(data);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateMyProfile = createAsyncThunk('patch/updateMyProfile', async (data,{rejectWithValue}) => {
  console.log(data);
  try {
    const formData = new FormData();
    formData.append('email', data?.email);
    formData.append('address', data?.address);
    formData.append('fullName', data?.fullName);
    formData.append('mobile_number', data?.mobile_number);
    formData.append('remove', data?.remove?1:0);
    if(data.files!==null && data.files!==undefined){
      formData.append(`files`, data.files);
    }
    // else{
    //   formData.append('photo', data?.profile?.photo);
    // }
    const response = await DataService.patchFormData(`/api/v1/users/admin`, formData);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const ChangePassword = createAsyncThunk('patch/ChangePassword', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/users/updatePasswordAdmin`,data);
    if(response.data!==undefined || response.data!==null){
      console.log(response);
      return response.data;
    }
  } catch (error) {
    throw rejectWithValue(error);
  }
});
