import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getsalons } from "./salonApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    salonList:[]
}
export const getSalons = createAsyncThunk(
    'get/allsalons',
    async (state) => {
        const response = await getsalons(state)
        return response;
    }
);
const salonSlice = createSlice({
    name:'authentication',
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
            console.log(action.payload)
            state.message = action.payload.message;
          })
          .addCase(getSalons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default salonSlice.reducer;