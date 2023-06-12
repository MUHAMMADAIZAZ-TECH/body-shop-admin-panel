import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createaddress, createavailibityhours, createsalon, deleteaddress, deleteavailibityhours, deletesalon, deletesalonreview, getaddress, getallreviews, getavailibilityhours, getsalon, getsalonreview, getsalons, updateaddress, updateavailibityhours, updatesalon, updatesalonreview } from "./salonApis";

const initialState = {
    status:false,
    loading:false,
    error:false,
    message:"",
    salons:[],
    salon:null,
    approvedSalons:[],
    unapprovedSalons:[],
    availibilityhours:[],
    salonreviews:[],
    salonreview:null,
    addresses:[],
}
// salon-crud
export const getSalons = createAsyncThunk(
    'get/getsalons',
    async () => {
        const response = await getsalons()
        return response;
    }
);
export const getSalon = createAsyncThunk(
  'get/getSalon',
  async (id) => {
      const response = await getsalon(id)
      return response;
  }
);
export const createSalon = createAsyncThunk(
  'post/createSalon',
  async (body) => {
      const response = await createsalon(body)
      return response;
  }
);
export const updateSalon = createAsyncThunk(
  'update/updateSalon',
  async (body) => {
      const response = await updatesalon(body)
      return response;
  }
);
export const deleteSalon = createAsyncThunk(
  'delete/deleteSalon',
  async (id) => {
      const response = await deletesalon(id)
      return response;
  }
);
// availibilityhours-crud
export const getAvailibilityHours = createAsyncThunk(
  'get/getavailibilityhours',
  async () => {
      const response = await getavailibilityhours()
      return response;
  }
);
export const createAvailibilityHours = createAsyncThunk(
  'post/createAvailibilityHours',
  async (body) => {
      const response = await createavailibityhours(body)
      return response;
  }
);
export const updateAvailibilityHours = createAsyncThunk(
  'update/updateAvailibilityHours',
  async (body) => {
      const response = await updateavailibityhours(body)
      return response;
  }
);
export const deleteAvailibilityHours = createAsyncThunk(
  'delete/deleteAvailibilityHours',
  async (id) => {
      const response = await deleteavailibityhours(id)
      return response;
  }
);
// reviews
export const getAllReviews = createAsyncThunk(
  'get/getallreviews',
  async () => {
      const response = await getallreviews()
      return response;
  }
);
export const getSalonReview = createAsyncThunk(
  'get/getSalonReview',
  async (id) => {
      const response = await getsalonreview(id)
      return response;
  }
);
export const updateSalonReview = createAsyncThunk(
  'update/updateSalonReview',
  async (body) => {
      const response = await updatesalonreview(body)
      return response;
  }
);
export const deleteSalonReview = createAsyncThunk(
  'delete/deleteSalonReview',
  async (id) => {
      const response = await deletesalonreview(id)
      return response;
  }
);
// addresses
export const getAddress = createAsyncThunk(
  'get/getAddress',
  async () => {
      const response = await getaddress()
      return response;
  }
);
export const createAddress = createAsyncThunk(
  'post/createAddress',
  async (body) => {
      const response = await createaddress(body)
      return response;
  }
);
export const updateAddress = createAsyncThunk(
  'update/updateAddress',
  async (body) => {
      const response = await updateaddress(body)
      return response;
  }
);
export const deleteAddress = createAsyncThunk(
  'delete/deleteAddress',
  async (id) => {
      const response = await deleteaddress(id)
      return response;
  }
);
const salonSlice = createSlice({
    name:'salonslice',
    initialState,
    reducers:{
      selectSalon: (state,action)=>{
        state.salon = action.payload
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getSalons.pending, (state) => {
            state.loading = true;
            state.status = false;
            state.error = null;
            state.message = null;
          })
          .addCase(getSalons.fulfilled, (state, action) => {
            state.status = true;
            state.loading = false;
            state.salons = action?.payload?.data;
            if(action.payload){
              state.approvedSalons = action?.payload?.data.filter((salon) => salon.isApproved === 1);
              state.unapprovedSalons = action?.payload?.data.filter((salon) => salon.isApproved === 0);
              }
          })
          .addCase(getSalons.rejected, (state, action) => {
            state.loading = false;
            state.status = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(getSalon.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = false;
            state.message = null;
          })
          .addCase(getSalon.fulfilled, (state, action) => {
            state.status = true;
            state.loading = false;
            state.salon = action?.payload?.data;
          })
          .addCase(getSalon.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(createSalon.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(createSalon.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = "Successfuly created";
          })
          .addCase(createSalon.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(updateSalon.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(updateSalon.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = "Successfuly updated";
          })
          .addCase(updateSalon.rejected, (state, action) => {
            state.loading = false;
            state.status = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(deleteSalon.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteSalon.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = "Successfuly deleted";
          })
          .addCase(deleteSalon.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(getAvailibilityHours.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(getAvailibilityHours.fulfilled, (state, action) => {
            state.status = true;
            state.loading = false;
            state.availibilityhours = action.payload
          })
          .addCase(getAvailibilityHours.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(createAvailibilityHours.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(createAvailibilityHours.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = "Successfully created";
          })
          .addCase(createAvailibilityHours.rejected, (state, action) => {
            state.loading = false;
            state.status = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(updateAvailibilityHours.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(updateAvailibilityHours.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = "Successfully updated";
          })
          .addCase(updateAvailibilityHours.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(deleteAvailibilityHours.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteAvailibilityHours.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = "Successfully deleted";
          })
          .addCase(deleteAvailibilityHours.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(getAllReviews.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(getAllReviews.fulfilled, (state, action) => {
            state.status = true;
            state.loading = false;
            state.salonreviews = action.payload
          })
          .addCase(getAllReviews.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
          builder
          .addCase(getSalonReview.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(getSalonReview.fulfilled, (state, action) => {
            state.status = true;
            state.loading = false;
            state.salonreview = action.payload
          })
          .addCase(getSalonReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
            state.status = false;
          });
          builder
          .addCase(deleteSalonReview.pending, (state) => {
            state.status = false;
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteSalonReview.fulfilled, (state) => {
            state.status = true;
            state.loading = false;
            state.message = 'Successfully deleted';
          })
          .addCase(deleteSalonReview.rejected, (state, action) => {
            state.status = false;
            state.loading = false;
            state.error = action.error;
            state.message = 'Something went wrong';
          });
        
      },
})


export const { selectSalon } = salonSlice.actions

export default salonSlice.reducer;