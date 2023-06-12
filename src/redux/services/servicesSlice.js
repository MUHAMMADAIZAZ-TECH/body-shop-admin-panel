import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getservvices,getservice,createservice,deleteservice,updateservice } from "./servicesApis";

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
export const getService = createAsyncThunk(
  'get/getService',
  async (id) => {
      const response = await getservice(id)
      console.log(response)
      return response;
  }
);
export const createService = createAsyncThunk(
  'post/createService',
  async (body) => {
      const response = await createservice(body)
      console.log(response)
      return response;
  }
);
export const updateService = createAsyncThunk(
  'patch/updateService',
  async (body) => {
      const response = await updateservice(body)
      console.log(response)
      return response;
  }
);
export const deleteService = createAsyncThunk(
  'delete/deleteService',
  async (body) => {
      const response = await deleteservice(body)
      console.log(response)
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
          builder
          .addCase(getService.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getService.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.status;
            state.category = action.payload.data;
          })
          .addCase(getService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = "Something Went Wrong";
          });
          builder
          .addCase(createService.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(createService.fulfilled, (state) => {
            state.loading = false;
            state.message = "Successfully Created";
            state.success = true;
          })
          .addCase(createService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = "Something Went Wrong";
            state.success = false;
          });
          builder
          .addCase(updateService.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(updateService.fulfilled, (state) => {
            state.loading = false;
            state.message = "Successfully Updated";
            state.success = true;
          })
          .addCase(updateService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = "Something Went Wrong";
            state.success = false;
          });
          builder
          .addCase(deleteService.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
          })
          .addCase(deleteService.fulfilled, (state) => {
            state.loading = false;
            state.message = "Successfully Deleted";
            state.success = true;
          })
          .addCase(deleteService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = "Something Went Wrong";
            state.success = false;
          });
      },
})


// export const { } = salonSlice.actions

export default servicesSlice.reducer;