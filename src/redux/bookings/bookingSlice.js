import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getbookings } from "./bookingApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    Bookings:[]
}
export const getBookings = createAsyncThunk(
    'get/getbookings',
    async () => {
        const response = await getbookings()
        return response;
    }
);

const bookingSlice = createSlice({
    name:'bookingSlice',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(getBookings.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getBookings.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.Bookings = action.payload.data;
          })
          .addCase(getBookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default bookingSlice.reducer;