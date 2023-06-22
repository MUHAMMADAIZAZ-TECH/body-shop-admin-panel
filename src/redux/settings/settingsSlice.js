import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getcustompages, getcustompage, createcustompage, updatecustompage, deletecustompage } from './settingsApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  CustomPages: [],
  CustomPage: null,
};
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
        message.success('Successfully Created')
        state.success = true;
      })
      .addCase(createCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
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
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(updateCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
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
        message.success('Successfully Deleted')
        state.faqs = true;
      })
      .addCase(deleteCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        message.error('Something Went Wrong')
        state.message = 'Something Went Wrong';
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default CustomPageSlice.reducer;
