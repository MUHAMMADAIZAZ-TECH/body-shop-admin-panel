import { DataService } from '../../config/dataService/mydataService';

export const getmyprofile = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/users/admin`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updatemyprofile = async (data) => {
 
  const formData = new FormData();
  formData.append('email', data?.email);
  formData.append('address', data?.address);
  formData.append('fullName', data?.fullName);
  formData.append('mobile_number', data?.mobile_number);
  if(data.files!==null){
    formData.append(`files`, data.files);
  }
  try {
    const response = await DataService.patchFormData(`/api/v1/users/admin`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};

