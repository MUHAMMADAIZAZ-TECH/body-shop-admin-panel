import { DataService } from '../../config/dataService/mydataService';

export const getsalons = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/salons/all`);
    return data;
  } catch (error) {
    return error;
  }
}
export const getavailibilityhours = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/availabilityHours`);
    return data;
  } catch (error) {
    return error;
  }
}
export const getallreviews = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/reviews/`);
    return data;
  } catch (error) {
    return error;
  }
}
