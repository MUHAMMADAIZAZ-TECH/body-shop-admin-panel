import { DataService } from '../../config/dataService/mydataService';

export const userLogin = async (state) => {
  const response = await DataService.post(`/api/v1/users/admin-login`, {
    email: state.username,
    password: state.password,
  });
  return response;
};
export const forgotpassword = async (state) => {
  const response = await DataService.patch(`/api/v1/users/forgetpassword/admin`,state);
  return response.data;
};
