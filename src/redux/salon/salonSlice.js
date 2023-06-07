import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getallreviews, getavailibilityhours, getsalons } from "./salonApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    salons:[],
    approvedSalons:[],
    unapprovedSalons:[],
    availibilityhours:[],
    salonreviews:[]
}
export const getSalons = createAsyncThunk(
    'get/getsalons',
    async (state) => {
        const response = await getsalons(state)
        return response;
    }
);
export const getAvailibilityHours = createAsyncThunk(
  'get/getavailibilityhours',
  async () => {
      const response = await getavailibilityhours()
      return response;
  }
);
export const getAllReviews = createAsyncThunk(
  'get/getallreviews',
  async () => {
      const response = await getallreviews()
      console.log(response)
      return response;
  }
);
const salonSlice = createSlice({
    name:'salonslice',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(getSalons.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getSalons.fulfilled, (state, action) => {
            state.loading = false;
            state.salons = action.payload.data;
            state.message = action.payload.status;
            if(action.payload.data){
              state.approvedSalons = action?.payload?.data.filter((salon) => salon.isApproved === 1);
              state.unapprovedSalons = action?.payload?.data.filter((salon) => salon.isApproved === 0);
              }
          })
          .addCase(getSalons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(getAvailibilityHours.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAvailibilityHours.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.availibilityhours = action.payload
          })
          .addCase(getAvailibilityHours.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(getAllReviews.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getAllReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.salonreviews = action.payload
          })
          .addCase(getAllReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default salonSlice.reducer;