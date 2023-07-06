import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getConfigs = createAsyncThunk('get/getConfigs', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/configs`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateConfigs = createAsyncThunk('get/updateConfigs', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/configs/`, body);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getCustomPages = createAsyncThunk('get/getCustomPages', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/custom`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getCustomPage = createAsyncThunk('get/getCustomPage', async (id,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/custom/${id}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const createCustomPage = createAsyncThunk('get/createCustomPage', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/custom`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateCustomPage = createAsyncThunk('get/updateCustomPage', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/custom/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const deleteCustomPage = createAsyncThunk('get/deleteCustomPage', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.delete(`/api/v1/custom/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const createReservationfee = createAsyncThunk('get/createReservationfee', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/reservationfee/`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getCountries = createAsyncThunk('get/getCountries', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`https://restcountries.com/v3.1/all?fields=name,currencies`);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});


