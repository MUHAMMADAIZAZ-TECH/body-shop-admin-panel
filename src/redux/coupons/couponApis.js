import { DataService } from '../../config/dataService/mydataService';

export const getcoupons = async ({
  currentPage,
  pageSize,
  setTotalPages
}) => {
  try {
    const { data } = await DataService.get(`/api/v1/coupons?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(data.totalPages)
    return data;
  } catch (error) {
    return error;
  }
};

export const getcoupon = async (id) => {
  try {
    const { data } = await DataService.get(`/api/v1/coupons/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const createcoupon = async (data) => {
  try {
    const response = await DataService.post(`/api/v1/coupons`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updatecoupon = async (data) => {
  try {
    const response = await DataService.patch(`/api/v1/coupons/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deletecoupon = async (body) => {
  try {
    const { data } = await DataService.delete(`/api/v1/coupons/admin/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    return error;
  }
};
