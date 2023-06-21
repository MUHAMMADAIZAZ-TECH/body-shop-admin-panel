import { DataService } from '../../config/dataService/mydataService';

export const getbookings = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/bookings/admin`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getbooking = async (id) => {
  try {
    const { data } = await DataService.get(`/api/v1/bookings/admin/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const updatebooking = async (Body) => {
  try {
    const response = await DataService.patch(`/api/v1/bookings/update/${Body.id}`, Body);
    return response.data;
  } catch (error) {
    return error;
  }
};
