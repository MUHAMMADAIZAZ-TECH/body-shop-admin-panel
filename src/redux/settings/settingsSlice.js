import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  getconfigs,
  getcustompages,
  getcustompage,
  createcustompage,
  updatecustompage,
  deletecustompage,
  updateconfigs,
} from './settingsApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  CustomPages: [],
  CustomPage: null,
  configs: [],
};
export const getConfigs = createAsyncThunk('get/getConfigs', async () => {
  const response = await getconfigs();
  return response;
});
export const updateConfigs = createAsyncThunk('patch/updateConfigs', async (body) => {
  const response = await updateconfigs(body);
  return response;
});
export const getCustomPages = createAsyncThunk('get/getCustomPages', async () => {
  const response = await getcustompages();
  return response;
});
export const getCustomPage = createAsyncThunk('get/getCustomPage', async (id) => {
  console.log(id);
  const response = await getcustompage(id);
  return response;
});
export const createCustomPage = createAsyncThunk('post/createCustomPage', async (body) => {
  const response = await createcustompage(body);
  return response;
});
export const updateCustomPage = createAsyncThunk('patch/updateCustomPage', async (body) => {
  const response = await updatecustompage(body);
  return response;
});
export const deleteCustomPage = createAsyncThunk('delete/deleteCustomPage', async (body) => {
  const response = await deletecustompage(body);
  return response;
});

const CustomPageSlice = createSlice({
  name: 'CustomPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.configs = action.payload.data;
      })
      .addCase(getConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });
    builder
      .addCase(updateConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfigs.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });
    builder
      .addCase(getCustomPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomPages.fulfilled, (state, action) => {
        state.loading = false;
        state.CustomPages = action.payload.data;
      })
      .addCase(getCustomPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });

    builder
      .addCase(getCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomPage.fulfilled, (state, action) => {
        state.loading = false;
        state.CustomPage = action.payload.data;
      })
      .addCase(getCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
      });
    builder
      .addCase(createCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCustomPage.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Created';
        message.success('Successfully Created');
        state.success = true;
      })
      .addCase(createCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong');
        state.success = false;
      });
    builder
      .addCase(updateCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCustomPage.fulfilled, (state) => {
        state.loading = false;
        state.service = null;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated');
        state.success = true;
      })
      .addCase(updateCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong');
        state.success = false;
      });
    builder
      .addCase(deleteCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCustomPage.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Deleted';
        message.success('Successfully Deleted');
        state.faqs = true;
      })
      .addCase(deleteCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        message.error('Something Went Wrong');
        state.message = 'Something Went Wrong';
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default CustomPageSlice.reducer;
