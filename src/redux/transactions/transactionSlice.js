import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gettransactions } from './transactionApis';

const initialState = {
  loading: false,
  error: false,
  transactions: [],
};
export const getTransactions = createAsyncThunk('get/getTransactions', async () => {
  const response = await gettransactions();
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
        state.transactions = action.payload.data;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });
  },
});

// export const { } = salonSlice.actions

export default TransactionSlice.reducer;
