import { DataService } from '../../config/dataService/mydataService';

export const gettransactions = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/transactions`);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
