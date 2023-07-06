import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  getConfigs,
  getCustomPages,
  getCustomPage,
  createCustomPage,
  updateCustomPage,
  deleteCustomPage,
  updateConfigs,
  // createReservationfee,
  getCountries
} from './settingsApis';

const initialState = {
  loading: false,
  error: false,
  success: false,
  message: '',
  CustomPages: [],
  CustomPage: null,
  configs: [],
  countries:[]
};

const SettingsSlice = createSlice({
  name: 'SettingsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.configs = action.payload.data;
      })
      .addCase(getConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if(action.payload){
        const array = action.payload.map(country => ({
            value: country.name.official,
            label: country.name.official,
            country
          }))
          state.countries = array;
        }
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateConfigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfigs.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated')
      })
      .addCase(updateConfigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getCustomPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomPages.fulfilled, (state, action) => {
        state.loading = false;
        state.CustomPages = action.payload.data;
      })
      .addCase(getCustomPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomPage.fulfilled, (state, action) => {
        state.loading = false;
        state.CustomPage = action.payload.data;
      })
      .addCase(getCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCustomPage.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Created';
        message.success('Successfully Created');
        state.success = true;
      })
      .addCase(createCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(updateCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCustomPage.fulfilled, (state) => {
        state.loading = false;
        state.service = null;
        state.message = 'Successfully Updated';
        message.success('Successfully Updated');
        state.success = true;
      })
      .addCase(updateCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
    builder
      .addCase(deleteCustomPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCustomPage.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Successfully Deleted';
        message.success('Successfully Deleted');
        state.faqs = true;
      })
      .addCase(deleteCustomPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { } = salonSlice.actions

export default SettingsSlice.reducer;
