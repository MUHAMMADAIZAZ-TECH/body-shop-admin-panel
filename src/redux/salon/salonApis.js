import { DataService } from '../../config/dataService/mydataService';

// salon
export const getsalons = async () => {
  try {
    const response = await DataService.get(`/api/v1/salons/all`);
    return response?.data;
  } catch (error) {
    return error;
  }
}
export const getsalon = async (id) => {
  try {
    const response = await DataService.get(`/api/v1/salons/admin/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const createsalon = async (body) => {
  const AvailabilityHours = [{
    "weekday": "Friday",
    "opening_time": "09:00 AM",
    "closing_time": "17:00 PM"
  }]
  const files = body?.files.map((file)=>file.originFileObj)
  console.log(files)
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
  files.forEach((file) => {
    formData.append(`files`, file); // Append each file with a unique field name
  });
  
  [...formData.entries()].forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  try {
    const response = await DataService.postFormData(`/api/v1/salons`,formData);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const updatesalon = async (body) => {
  const AvailabilityHours = [{
    "weekday": "Friday",
    "opening_time": "09:00 AM",
    "closing_time": "17:00 PM"
  }]
  const files = body?.files.map((file)=>file.originFileObj)
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
  files.forEach((file) => {
    formData.append(`files`, file); // Append each file with a unique field name
  });
  try {
    const response = await DataService.patchFormData(`/api/v1/salons/${body.id}`,formData);
    console.log(response)
    return response.data;
  } catch (error) {
    return error;
  }
}
export const deletesalon = async ({id,getData}) => {
  try {
    const response = await DataService.delete(`/api/v1/salons/${id}`);
    await getData();
    return response.data;
  } catch (error) {
    console.log(error)
    return error;
  }
}
// availibility hours
export const getavailibilityhours = async () => {
  try {
    const response = await DataService.get(`/api/v1/availabilityHours`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const createavailibityhours = async (body) => {
  try {
    const response = await DataService.post(`/api/v1/availabilityHours`,body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const updateavailibityhours = async (body) => {
  try {
    const response = await DataService.patch(`/api/v1/availabilityHours`,body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const deleteavailibityhours = async (id) => {
  try {
    const response = await DataService.delete(`/api/v1/availabilityHours${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
// salon reviews
export const getallreviews = async () => {
  try {
    const response = await DataService.get(`/api/v1/reviews/`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const getsalonreview = async () => {
  // try {
  //   const response = await DataService.get(`/api/v1/reviews/${id}`);
  //   console.log(data)
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }
}
export const updatesalonreview = async (body) => {
  try {
    const response = await DataService.patch(`/api/v1/reviews/`,body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const deletesalonreview = async ({id,getData}) => {
  try {
    const response = await DataService.delete(`/api/v1/reviews/${id}`);
    await getData();
    console.log(response)
    return response.data;
  } catch (error) {
    return error;
  }
}
// addresses
export const getalladdress = async () => {
  try {
    const response = await DataService.get(`/api/v1/addresses`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const getaddress = async () => {
  try {
    const response = await DataService.get(`/api/v1/addresses`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const createaddress = async (body) => {
  try {
    const response = await DataService.post(`/api/v1/addresses`,body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const updateaddress = async (body) => {
  try {
    const response = await DataService.patch(`/api/v1/addresses`,body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const deleteaddress = async (id) => {
  try {
    const response = await DataService.delete(`/api/v1/addresses${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
