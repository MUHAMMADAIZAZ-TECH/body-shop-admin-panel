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
  formData.append('isApproved', JSON.stringify(true));
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
  if(body.isApproved===true || body.isApproved===1){
    formData.append('isApproved', 1);
  }
  else if(body.isApproved===false || body.isApproved===0){
    formData.append('isApproved', 0);
  }
 
  formData.append('isActive', body.isActive);
  files.forEach((file) => {
    formData.append(`files`, file); // Append each file with a unique field name
  });
  if(body.deletedImageIds.length>0){
    formData.append('deletedImageIds', JSON.stringify(body.deletedImageIds));
  }
  [...formData.entries()].forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const response = await DataService.patchFormData(`/api/v1/salons/${body.id}`,formData);
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
export const getavailibilityhour = async (id) => {
  try {
    const response = await DataService.get(`/api/v1/availabilityHours/byId/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const gethourbysalon = async (body) => {
  try {
    let response;
    if(body.weekday!==''){
      response  = await DataService.get(`/api/v1/availabilityHours/${body.salon_id}?weekday=${body.weekday}`);
    }
    else{
      response = await DataService.get(`/api/v1/availabilityHours/${body.salon_id}`);
    }
    return response.data;
  } catch (error) {
    console.log(error)
    return error;
  }
}
export const createavailibityhours = async (data) => {
  console.log(data)
  try {
    const response = await DataService.post(`/api/v1/availabilityHours`,data);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const updateavailibityhours = async (body) => {
  console.log(body)
  try {
    const response = await DataService.patch(`/api/v1/availabilityHours/${body.id}`,body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const deleteavailibityhours = async (body) => {
  try {
    const response = await DataService.delete(`/api/v1/availabilityHours/${body.id}`);
    body.getData();
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
export const getsalonreview = async (id) => {
  try {
    const response = await DataService.get(`/api/v1/reviews/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const updatesalonreview = async (body) => {
  console.log(body);
  try {
    const response = await DataService.patch(`/api/v1/reviews/${body.id}`,body);
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
export const getdashboard = async () =>{
  try {
    const response = await DataService.get(`/api/v1/salons/admin/stats`);
    return response.data;
  } catch (error) {
    return error;
  }
}