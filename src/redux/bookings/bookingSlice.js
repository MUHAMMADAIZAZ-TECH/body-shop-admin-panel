import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getbookings,getbooking, updatebooking } from "./bookingApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    Bookings:[],
    Booking:null
}
export const getBookings = createAsyncThunk(
    'get/getBookings',
    async () => {
        const response = await getbookings()
        return response;
    }
);
export const getBooking = createAsyncThunk(
  'get/getBooking',
  async (id) => {
      const response = await getbooking(id)
      return response;
  }
);
export const updateBooking = createAsyncThunk(
  'patch/updateBooking',
  async (body) => {
      const response = await updatebooking(body)
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
            state.Bookings = action.payload.data;
          })
          .addCase(getBookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(getBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.Booking = action.payload.data;
          })
          .addCase(getBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(updateBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateBooking.fulfilled, (state) => {
            state.loading = false;
            state.message = "Successfully Updated";
          })
          .addCase(updateBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default bookingSlice.reducer;