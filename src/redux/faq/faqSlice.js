import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getFaqs, getFaq, createFaq, updateFaq, deleteFaq } from './faqApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  faqs: [],
  faq: null,
};


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
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
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
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default FaqSlice.reducer;
