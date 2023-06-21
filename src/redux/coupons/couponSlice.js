import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getcoupons, getcoupon, createcoupon, updatecoupon, deletecoupon } from './couponApis';

const initialState = {
  loading: false,
  error: false,
  message: '',
  coupons: [],
  coupon: null,
};
export const getCoupons = createAsyncThunk('get/getCoupons', async () => {
  const response = await getcoupons();
  return response;
});
export const getCoupon = createAsyncThunk('get/getCoupon', async (id) => {
  const response = await getcoupon(id);
  return response;
});
export const createCoupon = createAsyncThunk('post/createCoupon', async (body) => {
  const response = await createcoupon(body);
  return response;
});
export const updateCoupon = createAsyncThunk('patch/updateCoupon', async (body) => {
  const response = await updatecoupon(body);
  return response;
});
export const deleteCoupon = createAsyncThunk('delete/deleteCoupon', async (body) => {
  const response = await deletecoupon(body);
  return response;
});

const CouponSlice = createSlice({
  name: 'CouponSlice',
  initialState,
  reducers: {},
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
    builder
      .addCase(getCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload.data;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
      });
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCoupon.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Created';
        message.success('Successfully Created')
        state.success = true;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
    builder
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCoupon.fulfilled, (state) => {
        state.loading = false;
        state.service = null;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCoupon.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Deleted';
        message.success('Successfully Deleted')
        state.success = true;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default CouponSlice.reducer;
