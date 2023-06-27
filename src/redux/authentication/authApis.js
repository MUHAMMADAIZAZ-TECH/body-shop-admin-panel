import { DataService } from '../../config/dataService/mydataService';

export const userLogin = async (state) => {
  try {
    const response = await DataService.post(`/api/v1/users/admin-login`, {
      email: state.username,
      password: state.password,
    });
    if(response.data.data){
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('user',JSON.stringify(response.data.data.user))
    }
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error', error);
    return error;
  }
};
export const forgotpassword = async (state) => {
  try {
    const response = await DataService.patch(`/api/v1/users/forgetpassword/admin`,state);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error', error);
    return error;
  }
};
