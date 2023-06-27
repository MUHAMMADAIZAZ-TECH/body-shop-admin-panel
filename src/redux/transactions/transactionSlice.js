import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gettransactions,searchtransactions } from './transactionApis';

const initialState = {
  loading: false,
  error: false,
  transactions: [],
};
export const getTransactions = createAsyncThunk('get/getTransactions', async (Body) => {
  const response = await gettransactions(Body);
  return response;
});
export const SearchTransactions = createAsyncThunk('get/SearchTransactions', async (Body) => {
  const response = await searchtransactions(Body);
  return response;
});
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
        state.error = action.error;
        state.message = action.error.message;
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
        state.error = action.error;
        state.message = action.error.message;
      });
  },
});

// export const { } = salonSlice.actions

export default TransactionSlice.reducer;
