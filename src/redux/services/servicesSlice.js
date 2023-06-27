import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getservvices, getservice, createservice, deleteservice, updateservice,getservicesofsalon } from './servicesApis';

const initialState = {
  success: false,
  loading: false,
  error: false,
  message: '',
  services: [],
  service: null,
};
export const getServices = createAsyncThunk('get/getServices', async () => {
  const response = await getservvices();
  return response;
});
export const getService = createAsyncThunk('get/getService', async (id) => {
  const response = await getservice(id);
  return response;
});
export const getServicesofSalon = createAsyncThunk('get/getServicesofSalon', async (salonid) => {
  const response = await getservicesofsalon(salonid);
  return response;
});
export const createService = createAsyncThunk('post/createService', async (body) => {
  const response = await createservice(body);
  console.log(response);
  return response;
});
export const updateService = createAsyncThunk('patch/updateService', async (body) => {
  const response = await updateservice(body);
  console.log(response);
  return response;
});
export const deleteService = createAsyncThunk('delete/deleteService', async (body) => {
  const response = await deleteservice(body);
  console.log(response);
  return response;
});

const servicesSlice = createSlice({
  name: 'servicesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = action.error.message;
      });
      builder
      .addCase(getServicesofSalon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServicesofSalon.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServicesofSalon.rejected, (state, action) => {
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
        state.service = action.payload.data;
      })
      .addCase(getService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
      });
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createService.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Created';
        message.success('Successfully Created')
        state.success = true;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
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
        state.service = null;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
        state.success = true;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
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
        state.message = 'Successfully Deleted';
        message.success('Successfully Deleted')
        state.success = true;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = 'Something Went Wrong';
        message.error('Something Went Wrong')
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default servicesSlice.reducer;
