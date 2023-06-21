import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { createcategory, deletecategory, getcategories, getcategory, updatecategory } from './categoriesApis';

const initialState = {
  success: false,
  loading: false,
  error: false,
  message: '',
  categories: [],
  category: null,
};
export const getCategories = createAsyncThunk('get/getcategories', async () => {
  const response = await getcategories();
  return response;
});
export const getCategory = createAsyncThunk('get/getCategory', async (id) => {
  const response = await getcategory(id);
  console.log(response);
  return response;
});
export const createCategory = createAsyncThunk('post/createCategory', async (body) => {
  const response = await createcategory(body);
  console.log(response);
  return response;
});
export const updateCategory = createAsyncThunk('patch/updateCategory', async (body) => {
  const response = await updatecategory(body);
  console.log(response);
  return response;
});
export const deleteCategory = createAsyncThunk('delete/deleteCategory', async (body) => {
  const response = await deletecategory(body);
  console.log(response);
  return response;
});

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.status;
        state.categories = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
      });
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.status;
        state.category = action.payload.data;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
      });
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Created';
        state.success = true;
        message.success('Successfully Created')
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Deleted';
        message.success('Successfully Deleted')
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        message.error('Something Went Wrong')
        state.message = 'Something Went Wrong';
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default categoriesSlice.reducer;
