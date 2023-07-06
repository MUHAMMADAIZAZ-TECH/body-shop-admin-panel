import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getBookings = createAsyncThunk('get/getBookings', async ({
  currentPage,
  pageSize,
  setTotalPages
},{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/bookings/admin?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(data.totalPages)
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getBooking = createAsyncThunk('get/getBooking', async (id,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/bookings/admin/${id}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const searchBooking = createAsyncThunk('get/searchBooking', async (id,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/bookings/admin/${id}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateBooking = createAsyncThunk('get/updateBooking', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/bookings/admin/update/${body.id}`, body);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
