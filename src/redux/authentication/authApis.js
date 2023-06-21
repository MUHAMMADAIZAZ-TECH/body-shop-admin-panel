import { DataService } from '../../config/dataService/mydataService';

export const userLogin = async (state) => {
  try {
    const response = await DataService.post(`/api/v1/users/admin-login`, {
      email: state.username,
      password: state.password,
    });
    localStorage.setItem('access_token', response.data.token);
    if(response.data.data.user){
      localStorage.setItem('user',JSON.stringify(response.data.data.user))
    }
    return response.data;
  } catch (error) {
    console.log('Error', error);
    return error;
  }
};
