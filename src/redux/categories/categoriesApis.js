import { DataService } from '../../config/dataService/mydataService';

export const getcategories = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/categories`);
    return data;
  } catch (error) {
    return error;
  }
}
