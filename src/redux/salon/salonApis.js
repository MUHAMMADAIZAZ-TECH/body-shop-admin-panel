import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/mydataService';

// salon
export const getSalons = createAsyncThunk('get/getsalons', async ({
  currentPage,
  pageSize,
  setTotalPages,
  approved
},{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/salons/all?isApproved=${approved}&page=${currentPage}&limit=${pageSize}`);
    setTotalPages(response.data.totalPages)
    return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
});
export const getSalonsList = createAsyncThunk('get/getSalonsList', async ({
  currentPage,
  pageSize,
  setTotalPages,
},{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/salons/admin/all?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(response.data.totalPages)
    return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
});
export const getSalonsBySearch = createAsyncThunk('search/searchsalons', async ({
  currentPage,
  pageSize,
  setTotalPages,
  approved,
  searchText
},{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/salons/all?isApproved=${approved}&page=${currentPage}&limit=${pageSize}&name=${searchText}`);
    setTotalPages(response.data.totalPages)
    return response?.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getSalon = createAsyncThunk('get/getSalon', async (id,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/salons/admin/${id}`);
  return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
});

export const createSalon = createAsyncThunk('post/createSalon', async (body,{rejectWithValue}) => {
  try {
    const AvailabilityHours = [
      {
        weekday: body.weekday,
        opening_time: body.opening_time,
        closing_time: body.closing_time,
      },
    ];
    const files = body?.files.map((file) => file.originFileObj);
    const formData = new FormData();
    formData.append('name', body?.name);
    formData.append('description', body?.description);
    formData.append('phone_number', body?.phone_number);
    formData.append('mobile_number', body?.mobile_number);
    formData.append('address', body?.address);
    formData.append('longitude', '23');
    formData.append('latitude', '33');
    formData.append('availability_range', body?.availability_range.toString());
    formData.append('availability_hours', JSON.stringify(AvailabilityHours));
    formData.append('document', body?.document.file.originFileObj);
    formData.append('isApproved', JSON.stringify(true));
    files.forEach((file) => {
      formData.append(`files`, file); // Append each file with a unique field name
    });
  
    [...formData.entries()].forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    const response = await DataService.postFormData(`/api/v1/salons/admin`, formData);
    return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
});
export const updateSalon = createAsyncThunk('update/updateSalon', async (body,{rejectWithValue}) => {
  try {
    const files = body?.files.map((file) => file.originFileObj);
  const formData = new FormData();
  formData.append('name', body?.name);
  formData.append('description', body?.description);
  formData.append('phone_number', body?.phone_number);
  formData.append('mobile_number', body?.mobile_number);
  formData.append('address', body?.address);
  formData.append('longitude', '23');
  formData.append('latitude', '33');
  formData.append('availability_range', body?.availability_range.toString());
  if (body.isApproved === true || body.isApproved === 1) {
    formData.append('isApproved', 1);
  } else if (body.isApproved === false || body.isApproved === 0) {
    formData.append('isApproved', 0);
  }

  formData.append('isActive', body.isActive);
  files.forEach((file) => {
    formData.append(`files`, file); // Append each file with a unique field name
  });
  if (body.deletedImageIds.length > 0) {
    formData.append('deletedImageIds', JSON.stringify(body.deletedImageIds));
  }
  [...formData.entries()].forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  const response = await DataService.patchFormData(`/api/v1/salons/admin/${body.id}`, formData);
  return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
});
export const deleteSalon = createAsyncThunk('delete/deleteSalon', async ({ id, getData },{rejectWithValue}) => {
  try {
    const response = await DataService.delete(`/api/v1/salons/admin/${id}`);
    await getData();
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// availibility hours
export const getAvailibilityHours = createAsyncThunk('get/getavailibilityhours', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/availabilityHours`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getAvailibilityHour = createAsyncThunk('get/getAvailibilityHour', async (id,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/availabilityHours/byId/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getAvailibilityHourbysalon = createAsyncThunk('get/getAvailibilityHourbysalon', async (body,{rejectWithValue}) => {
  try {
    let response;
    if (body.weekday !== '') {
      response = await DataService.get(`/api/v1/availabilityHours/${body.salon_id}?weekday=${body.weekday}`);
    } else {
      response = await DataService.get(`/api/v1/availabilityHours/${body.salon_id}`);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const createAvailibilityHours = createAsyncThunk('post/createAvailibilityHours', async (data,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/availabilityHours/admin`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const updateAvailibilityHours = createAsyncThunk('update/updateAvailibilityHours', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/availabilityHours/admin/${body.id}`, body);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteAvailibilityHours = createAsyncThunk('delete/deleteAvailibilityHours', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.delete(`/api/v1/availabilityHours/${body.id}`);
    body.getData();
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// salon reviews
export const getAllReviews = createAsyncThunk('get/getallreviews', async ({
  currentPage,
  pageSize,
  setTotalPages
},{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/reviews/?page=${currentPage}&limit=${pageSize}`);
  setTotalPages(response.data.totalPages)
  return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAllReviewsBySearch = createAsyncThunk('get/getallreviewsbysearch', async ({
  currentPage,
  pageSize,
  setTotalPages,
  searchText
},{rejectWithValue}) => {
 
  try {
    const response = await DataService.get(`/api/v1/reviews/?page=${currentPage}&limit=${pageSize}&search=${searchText}`);
    setTotalPages(response.data.totalPages)
    return response?.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getSalonReview = createAsyncThunk('get/getSalonReview', async (id,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/reviews/${id}`);
  return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const updateSalonReview = createAsyncThunk('update/updateSalonReview', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/reviews/${body.id}`, body);
  return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteSalonReview = createAsyncThunk('delete/deleteSalonReview', async ({ id,salonid, getData },{rejectWithValue}) => {
  try {
    const response = await DataService.delete(`/api/v1/reviews/admin/${id}/${salonid}`);
  await getData();
  return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
// addresses
export const getalladdress = async () => {
  const response = await DataService.get(`/api/v1/addresses`);
  return response.data;
};

export const getAddress = createAsyncThunk('get/getAddress', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/addresses`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const createAddress = createAsyncThunk('post/createAddress', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.post(`/api/v1/addresses`, body);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const updateAddress = createAsyncThunk('update/updateAddress', async (body,{rejectWithValue}) => {
  try {
    const response = await DataService.patch(`/api/v1/addresses`, body);
  return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deleteAddress = createAsyncThunk('delete/deleteAddress', async (id,{rejectWithValue}) => {
  try {
    const response = await DataService.delete(`/api/v1/addresses${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getDashboard = createAsyncThunk('get/getDashboard', async (year,{rejectWithValue}) => {
  try {
    const response = await DataService.get(`/api/v1/salons/admin/stats?year=${year}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});