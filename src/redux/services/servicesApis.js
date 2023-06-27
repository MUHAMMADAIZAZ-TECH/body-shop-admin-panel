import { DataService } from '../../config/dataService/mydataService';

export const getservvices = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/services`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getservice = async (id) => {
  try {
    const { data } = await DataService.get(`/api/v1/services/getone/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getservicesofsalon = async (salonid) => {
  try {
    const { data } = await DataService.get(`/api/v1/services/${salonid}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const createservice = async (body) => {
  try {
    const formData = new FormData();
    formData.append('salon_id', body?.salon_id);
    formData.append('category_id', body?.category_id);
    formData.append('price', body?.price);
    formData.append('name', body?.name);
    formData.append('duration', body?.duration);
    formData.append('description', body?.description);
    if (body?.file !== null) {
      formData.append('files', body?.file);
    }
    console.log(body);
    const { data } = await DataService.postFormData(`/api/v1/services`, formData);
    return data;
  } catch (error) {
    return error;
  }
};
export const updateservice = async (body) => {
  try {
    const formData = new FormData();
    formData.append('salon_id', body?.salon_id);
    formData.append('category_id', body?.category_id);
    formData.append('price', body?.price);
    formData.append('name', body?.name);
    formData.append('duration', body?.duration);
    formData.append('description', body?.description);
    formData.append('is_available', body?.is_available ? 1 : 0);
    formData.append('enable_customer_booking', body?.enable_customer_booking ? 1 : 0);
    if (body?.file !== null && body?.file !== undefined) {
      formData.append('files', body?.file);
    }
    const { data } = await DataService.patchFormData(`/api/v1/services/${body.id}`, formData);
    return data;
  } catch (error) {
    return error;
  }
};
export const deleteservice = async (body) => {
  try {
    const { data } = await DataService.delete(`/api/v1/services/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    return error;
  }
};
