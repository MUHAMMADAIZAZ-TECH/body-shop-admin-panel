import { DataService } from '../../config/dataService/mydataService';

export const gettransactions = async ({
  currentPage,
  pageSize,
  setTotalPages
}) => {
  try {
    const { data } = await DataService.get(`/api/v1/transactions?page=${currentPage}&limit=${pageSize}`);
    setTotalPages(data.totalPages)
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
