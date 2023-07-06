import { createSlice } from '@reduxjs/toolkit';
import { getTransactions,SearchTransactions } from './transactionApis';

const initialState = {
  loading: false,
  error: false,
  transactions: [],
};

const TransactionSlice = createSlice({
  name: 'TransactionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(SearchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(SearchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { } = salonSlice.actions

export default TransactionSlice.reducer;
