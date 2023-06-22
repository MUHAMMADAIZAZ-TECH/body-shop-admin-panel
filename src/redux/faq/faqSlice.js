import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getfaqs, getfaq, createfaq, updatefaq, deletefaq } from './faqApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  faqs: [],
  faq: null,
};
export const getFaqs = createAsyncThunk('get/getFaqs', async () => {
  const response = await getfaqs();
  return response;
});
export const getFaq = createAsyncThunk('get/getFaq', async (id) => {
  const response = await getfaq(id);
  return response;
});
export const createFaq = createAsyncThunk('post/createFaq', async (body) => {
  const response = await createfaq(body);
  return response;
});
export const updateFaq = createAsyncThunk('patch/updateFaq', async (body) => {
  const response = await updatefaq(body);
  return response;
});
export const deleteFaq = createAsyncThunk('delete/deleteFaq', async (body) => {
  const response = await deletefaq(body);
  return response;
});

const FaqSlice = createSlice({
  name: 'FaqSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFaqs.fulfilled, (state, action) => {
        state.loading = false;

        state.faqs = action.payload.data;
      })
      .addCase(getFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });
    builder
      .addCase(getFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.faq = action.payload.data;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
      });
    builder
      .addCase(createFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFaq.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Created';
        message.success('Successfully Created')
        state.success = true;
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
    builder
      .addCase(updateFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateFaq.fulfilled, (state) => {
        state.loading = false;
        state.service = null;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
    builder
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteFaq.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Deleted';
        message.success('Successfully Deleted')
        state.faqs = true;
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        message.error('Something Went Wrong')
        state.message = 'Something Went Wrong';
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default FaqSlice.reducer;
