import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  getDashboard,
  // createAddress,
  createAvailibilityHours,
  createSalon,
  // deleteAddress,
  deleteAvailibilityHours ,
  deleteSalon,
  deleteSalonReview,
  // getAddress,
  getAllReviews,
  getAvailibilityHour,
  getAvailibilityHours,
  getAvailibilityHourbysalon,
  getSalon,
  getSalonReview,
  getSalons,
  // updateAddress,
  updateAvailibilityHours,
  updateSalon,
  updateSalonReview,
  getSalonsBySearch,
  getSalonsList,
  getAllReviewsBySearch,
} from './salonApis';

const initialState = {
  status: false,
  loading: false,
  error: false,
  message: '',
  salons: [],
  salonsList:[],
  salon: {
    isActive: 1,
    isApproved: 1,
  },
  approvedSalons: [],
  unapprovedSalons: [],
  availibilityhours: [],
  availibilityhour: null,
  salonreviews: [],
  salonreview: null,
  addresses: [],
  availibilityhoursBysalon: [],
  dashboard: {
    totalBookings: 0,
    totalCustomers: 0,
    totalEarnings: '',
    totalSalons: 0,
  },
  dashboardDetails:null
};



const salonSlice = createSlice({
  name: 'salonslice',
  initialState,
  reducers: {
    selectSalon: (state, action) => {
      state.salon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.error = null;
        state.message = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.status = true;
        state.loading = false;
        state.dashboard = action?.payload?.data;
        if(action.payload.data){
          const bookings = action?.payload?.data?.monthlyBookings;
          const earnings = action?.payload?.data?.monthlyEarnings;
          const salondatasets = action?.payload?.data?.salonCount;
          const usersdatasets = action?.payload?.data?.usersCount;
          const allMonths = Array.from({ length: 12 }, (_, month) => {
            const monthIndex = month + 1;
            return {
              year: 2023,
              month: monthIndex,
              month_name: new Date(2023, month, 1).toLocaleString('en-us', { month: 'long' }),
              monthly_bookings: 0,
              monthly_earnings: '0.00',
              monthly_salons:0,
              monthly_users:0
            };
          });
          
          // Populate monthly bookings
          bookings.forEach((booking) => {
            const { month, monthly_bookings,year } = booking;
            const index = month - 1;
            allMonths[index].monthly_bookings = monthly_bookings;
            allMonths[index].year = year;
          });
          
          // Populate monthly earnings
          earnings.forEach((earning) => {
            const { month, monthly_earnings,year } = earning;
            const index = month - 1;
            allMonths[index].monthly_earnings = monthly_earnings;
            allMonths[index].year = year;
          });
          // Populate salons
          salondatasets.forEach((earning) => {
            const { month, salon_count,year } = earning;
            const index = month - 1;
            allMonths[index].monthly_salons = salon_count;
            allMonths[index].year = year;
          });
          // Populate users
          usersdatasets.forEach((earning) => {
            const { month, user_count ,year} = earning;
            const index = month - 1;
            allMonths[index].monthly_users = user_count;
            allMonths[index].year = year;
          });
          state.dashboardDetails = allMonths;
        }
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.error;
        state.message = 'Something went wrong';
      });
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
      })
      .addCase(getSalons.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.error;
        state.message = 'Something went wrong';
      });
      builder
      .addCase(getSalonsList.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.error = null;
        state.message = null;
      })
      .addCase(getSalonsList.fulfilled, (state, action) => {
        state.status = true;
        state.loading = false;
        state.salonsList = [...new Map([...state.salonsList, ...action.payload.data].map(salon => [salon.id, salon])).values()];
      })
      .addCase(getSalonsList.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.error;
        state.message = 'Something went wrong';
      });
      builder
      .addCase(getSalonsBySearch.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.error = null;
        state.message = null;
      })
      .addCase(getSalonsBySearch.fulfilled, (state, action) => {
        state.status = true;
        state.loading = false;
        state.salons = action?.payload?.data;
      })
      .addCase(getSalonsBySearch.rejected, (state, action) => {
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
        state.message = 'Successfuly created';
        message.success('Successfuly created')
      })
      .addCase(createSalon.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
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
        state.message = 'Successfuly updated';
        message.success('Successfuly updated')
      })
      .addCase(updateSalon.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
      });
    builder
      .addCase(deleteSalon.pending, (state) => {
        state.status = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSalon.fulfilled, (state,action) => {
        state.status = true;
        state.loading = false;
        console.log(action.payload);
        state.message = 'Successfuly deleted';
        message.success('Successfuly deleted')
      })
      .addCase(deleteSalon.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        console.log(action.payload);
        message.error(action.payload.data.message)
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
        state.availibilityhours = action.payload;
      })
      .addCase(getAvailibilityHours.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
      });
    builder
      .addCase(getAvailibilityHourbysalon.pending, (state) => {
        state.status = false;
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getAvailibilityHourbysalon.fulfilled, (state, action) => {
        state.status = true;
        state.loading = false;
        state.availibilityhoursBysalon = action.payload;
      })
      .addCase(getAvailibilityHourbysalon.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
      });
    builder
      .addCase(getAvailibilityHour.pending, (state) => {
        state.status = false;
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getAvailibilityHour.fulfilled, (state, action) => {
        state.status = true;
        state.loading = false;
        state.availibilityhour = action.payload.data;
      })
      .addCase(getAvailibilityHour.rejected, (state, action) => {
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
        state.message = 'Successfully created';
        message.success('Successfuly created')
      })
      .addCase(createAvailibilityHours.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
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
        state.message = 'Successfully updated';
        message.success('Successfuly updated')
      })
      .addCase(updateAvailibilityHours.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
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
        state.message = 'Successfully deleted';
        message.success('Successfuly deleted')
      })
      .addCase(deleteAvailibilityHours.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
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
        state.salonreviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
      });
      builder
      .addCase(getAllReviewsBySearch.pending, (state) => {
        state.status = false;
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getAllReviewsBySearch.fulfilled, (state, action) => {
        state.status = true;
        state.loading = false;
        state.salonreviews = action.payload;
      })
      .addCase(getAllReviewsBySearch.rejected, (state, action) => {
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
        state.salonreview = action.payload.data;
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
        message.success('Successfuly deleted')
      })
      .addCase(deleteSalonReview.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
      });
      builder
      .addCase(updateSalonReview.pending, (state) => {
        state.status = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalonReview.fulfilled, (state) => {
        state.status = true;
        state.loading = false;
        state.message = 'Successfully Updated';
        message.success('Successfuly Updated')
      })
      .addCase(updateSalonReview.rejected, (state, action) => {
        state.status = false;
        state.loading = false;
        state.error = action.error;
        state.message = 'Something went wrong';
        message.error('Something went wrong')
      });
  },
});

export const { selectSalon } = salonSlice.actions;

export default salonSlice.reducer;
