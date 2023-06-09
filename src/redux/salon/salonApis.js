import { DataService } from '../../config/dataService/mydataService';

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
    const response = await DataService.get(`/api/v1/salons/${id}`);
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

  // try {
  //   const response = await DataService.postFormData(`/api/v1/salons`,formData);
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }
}
export const deletesalon = async ({id,getData}) => {
  try {
    const response = await DataService.delete(`/api/v1/salons/${id}`);
    await getData();
    return response.data;
  } catch (error) {
    return error;
  }
}
export const getavailibilityhours = async () => {
  try {
    const response = await DataService.get(`/api/v1/availabilityHours`);
    return response.data;
  } catch (error) {
    return error;
  }
}
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

