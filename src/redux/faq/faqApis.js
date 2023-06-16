import { DataService } from '../../config/dataService/mydataService';

export const getfaqs = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/faqs`);
    return data;
  } catch (error) {
    return error;
  }
}

export const getfaq = async (id) => {
  try {
    const { data } = await DataService.get(`/api/v1/faqs/${id}`);
    return data;
  } catch (error) {
    return error;
  }
}
export const createfaq = async (data) => {
  try {
    const response = await DataService.post(`/api/v1/faqs`,data);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const updatefaq = async (data) => {
  try {
    const response = await DataService.patch(`/api/v1/faqs/${data.id}`,data);
    return response.data;
  } catch (error) {
    return error;
  }
}
export const deletefaq = async (body) => {
  try {
    const { data } = await DataService.delete(`/api/v1/faqs/${body.id}`);
    body.getData()
    return data;
  } catch (error) {
    return error;
  }
}
