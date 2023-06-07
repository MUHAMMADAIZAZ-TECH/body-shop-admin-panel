import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getcoupons } from "./couponApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    coupons:[]
}
export const getCoupons = createAsyncThunk(
    'get/getCoupons',
    async () => {
        const response = await getcoupons()
        return response;
    }
);

const CouponSlice = createSlice({
    name:'CouponSlice',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCoupons.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getCoupons.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.coupons = action.payload.data;
          })
          .addCase(getCoupons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default CouponSlice.reducer;