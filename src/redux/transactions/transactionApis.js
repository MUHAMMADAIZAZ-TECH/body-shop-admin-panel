import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getTransactions = createAsyncThunk('get/getTransactions', async ({
  currentPage,
  pageSize,
  setTotalPages
},{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/transactions?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(data.totalPages)
    console.log(data);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const SearchTransactions = createAsyncThunk('get/SearchTransactions', async ({
  currentPage,
  pageSize,
  setTotalPages,
  searchText
},{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/transactions?page=${currentPage}&limit=${pageSize}&search=${searchText}`);
    setTotalPages(data.totalPages)
    console.log(data);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
