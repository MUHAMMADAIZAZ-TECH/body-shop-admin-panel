import { DataService } from '../../config/dataService/mydataService';

export const getnotifications = async (body) => {
  try {
    const { data } = await DataService.get(`/api/v1/notifications/admin?page=${body.currentPage}&limit=${body.pageSize}`);
    return data;
  } catch (error) {
    return error;
  }
};