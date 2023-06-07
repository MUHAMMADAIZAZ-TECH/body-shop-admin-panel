import { DataService } from '../../config/dataService/mydataService';

export const getservvices = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/services`);
    return data;
  } catch (error) {
    return error;
  }
}
