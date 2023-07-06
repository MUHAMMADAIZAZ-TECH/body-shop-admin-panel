import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

export const getCategories = createAsyncThunk('get/getcategories', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/categories`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const getCategory = createAsyncThunk('get/getCategory', async (id,{rejectWithValue}) => {
  try {
    const { data } = await DataService.get(`/api/v1/categories/${id}`);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const createCategory = createAsyncThunk('get/createCategory', async (body,{rejectWithValue}) => {
  try {
    const formData = new FormData();
    formData.append('name', body?.name);
    formData.append('files', body?.file);
    formData.append('description', body?.description);
    formData.append('color', body?.color);
    console.log(body);
    const { data } = await DataService.postFormData(`/api/v1/categories`, formData);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const updateCategory = createAsyncThunk('get/updateCategory', async (body,{rejectWithValue}) => {
  try {
    const formData = new FormData();
    formData.append('name', body?.name);
    formData.append('description', body?.description);
    formData.append('color', body?.color);
    if (body?.file !== undefined) {
      formData.append('files', body?.file);
    }
    const { data } = await DataService.patchFormData(`/api/v1/categories/${body.id}`, formData);
    console.log(data);
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});
export const deleteCategory = createAsyncThunk('get/deleteCategory', async (body,{rejectWithValue}) => {
  try {
    const { data } = await DataService.delete(`/api/v1/categories/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    throw rejectWithValue(error);
  }
});


