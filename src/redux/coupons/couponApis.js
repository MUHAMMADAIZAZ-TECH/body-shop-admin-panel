import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getCoupons = createAsyncThunk('get/getCoupons', async ({
  currentPage,
  pageSize,
  setTotalPages
},{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/coupons?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(data.totalPages)
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getCoupon = createAsyncThunk('get/getCoupon', async (id,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/coupons/${id}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const createCoupon = createAsyncThunk('get/createCoupon', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/coupons`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateCoupon = createAsyncThunk('get/updateCoupon', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/coupons/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const deleteCoupon = createAsyncThunk('get/deleteCoupon', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.delete(`/api/v1/coupons/admin/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});

