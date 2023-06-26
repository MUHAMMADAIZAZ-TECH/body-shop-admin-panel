import { DataService } from '../../config/dataService/mydataService';

export const getnotifications = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/notifications/owner`);
    return data;
  } catch (error) {
    return error;
  }
};
