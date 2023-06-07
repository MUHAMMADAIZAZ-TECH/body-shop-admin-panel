import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getservvices } from "./servicesApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    services:[]
}
export const getServices = createAsyncThunk(
    'get/getServices',
    async () => {
        const response = await getservvices()
        return response;
    }
);

const servicesSlice = createSlice({
    name:'servicesSlice',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(getServices.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getServices.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.services = action.payload.data;
          })
          .addCase(getServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default servicesSlice.reducer;