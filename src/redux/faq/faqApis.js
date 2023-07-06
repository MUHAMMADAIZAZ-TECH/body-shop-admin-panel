import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getFaqs = createAsyncThunk('get/getFaqs', async ({
  currentPage,
  pageSize,
  setTotalPages
},{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/faqs?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(data.totalPages)
    console.log(data);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getFaq = createAsyncThunk('get/getFaq', async (id,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/faqs/${id}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const createFaq = createAsyncThunk('post/createFaq', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/faqs`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateFaq = createAsyncThunk('patch/updateFaq', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/faqs/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const deleteFaq = createAsyncThunk('delete/deleteFaq', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.delete(`/api/v1/faqs/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});


