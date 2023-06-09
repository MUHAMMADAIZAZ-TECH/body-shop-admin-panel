import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createsalon, deletesalon, deletesalonreview, getallreviews, getavailibilityhours, getsalon, getsalonreview, getsalons } from "./salonApis";

const initialState = {
    loading:false,
    error:false,
    message:"",
    salons:[],
    approvedSalons:[],
    unapprovedSalons:[],
    availibilityhours:[],
    salonreviews:[],
    salon:{
      id:0,
      name:'',
      address:'',
      availability_hours:[],
      availability_range:0,
      created_at:'',
      description:'',
      document:'',
      images:[],
      isActive:0,
      isApproved:1,
      latitude:'',
      longitude:'',
      mobile_number:'',
      phone_number:'',
      ratings_average:0,
      reservation_fees_id:0,
      salon_owner:0,
      updated_at:''
    },
    salonreview:null
}
// salon-crud
export const getSalons = createAsyncThunk(
    'get/getsalons',
    async (state) => {
        const response = await getsalons(state)
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
export const deleteSalon = createAsyncThunk(
  'delete/deleteSalon',
  async (body) => {
      const response = await deletesalon(body)
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
export const getsalonReview = createAsyncThunk(
  'get/getsalonReview',
  async (id) => {
      const response = await getsalonreview(id)
      console.log(response)
      return response;
  }
);
export const deleteSalonReview = createAsyncThunk(
  'get/deleteSalonReview',
  async (body) => {
      const response = await deletesalonreview(body)
      console.log(response)
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
            state.error = null;
          })
          .addCase(getSalons.fulfilled, (state, action) => {
            state.loading = false;
            state.salons = action?.payload?.data;
            state.message = action?.payload?.status;
            if(action.payload){
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
          .addCase(getSalon.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getSalon.fulfilled, (state, action) => {
            state.loading = false;
            state.salon = action?.payload?.data;
            state.message = action?.payload?.status;
          })
          .addCase(getSalon.rejected, (state, action) => {
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
            state.message = action?.payload?.status;
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
            state.message = action?.payload?.status;
            state.salonreviews = action.payload
          })
          .addCase(getAllReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(getsalonReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getsalonReview.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action?.payload?.status;
            state.salonreview = action.payload
          })
          .addCase(getsalonReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(deleteSalonReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteSalonReview.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action?.payload?.status;
          })
          .addCase(deleteSalonReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(createSalon.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createSalon.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase(createSalon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
          builder
          .addCase(deleteSalon.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteSalon.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase(deleteSalon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.message = action.error.message;
          });
      },
})


export const { selectSalon } = salonSlice.actions

export default salonSlice.reducer;