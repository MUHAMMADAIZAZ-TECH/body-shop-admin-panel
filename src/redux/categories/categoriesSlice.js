import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getcategories } from "./categoriesApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    categories:[]
}
export const getCategories = createAsyncThunk(
    'get/getcategories',
    async () => {
        const response = await getcategories()
        return response;
    }
);

const categoriesSlice = createSlice({
    name:'categoriesSlice',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.categories = action.payload.data;
          })
          .addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


// export const { } = salonSlice.actions

export default categoriesSlice.reducer;