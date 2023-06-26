import { DataService } from '../../config/dataService/mydataService';

export const getcustompages = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/custom`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getcustompage = async (id) => {
  try {
    const { data } = await DataService.get(`/api/v1/custom/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const createcustompage = async (data) => {
  try {
    const response = await DataService.post(`/api/v1/custom`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updatecustompage = async (data) => {
  try {
    const response = await DataService.patch(`/api/v1/custom/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deletecustompage = async (body) => {
  try {
    const { data } = await DataService.delete(`/api/v1/custom/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    return error;
  }
};

export const getconfigs = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/configs`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateconfigs = async (data) => {
  console.log(data);
  try {
    const response = await DataService.patch(`/api/v1/configs/`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};