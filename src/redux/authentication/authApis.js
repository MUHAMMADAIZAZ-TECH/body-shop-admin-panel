import { DataService } from '../../config/dataService/mydataService';

export const userLogin = async ( state ) =>{
    try {
        const response = await DataService.post(`/api/v1/users/login`,{
            "email": state.username,
            "password": state.password,
          })
          console.log(response.data)
        localStorage.setItem('access_token',response.data.token)
        return response.data;
    } catch (error) {
        console.log("Error",error)
        return error;
    }
}