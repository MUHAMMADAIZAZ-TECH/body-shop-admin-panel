import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getNotifications = createAsyncThunk('get/getNotifications', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/notifications/admin?page=${body.currentPage}&limit=${body.pageSize}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
