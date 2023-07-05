import axios from 'axios';
import { message } from 'antd';
import { getItem } from '../../utility/localStorageControl';


// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT = process.env.REACT_APP_MY_API_END_POINT;
const authHeader = () => ({
  Authorization: `Bearer ${getItem('access_token')}`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});

class DataService {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static postFormData(path = '', formData = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data: formData,
      headers: { ...authHeader(), ...optionalHeader, 'Content-Type': 'multipart/form-data' },
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static patchFormData(path = '', formData = {}, optionalHeader = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: formData,
      headers: { ...authHeader(), ...optionalHeader, 'Content-Type': 'multipart/form-data' },
    });
  }

  static delete(path = '', data = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers, Authorization: `Bearer ${getItem('access_token')}` };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    console.log(error.message);
    if(error.message ==='Network Error' || error.code ==='ERR_NETWORK'){
      console.log('Please Check Your Internet Connection')
      message.error('Please Check Your Internet Connection')
      return Promise.reject(error);
    }
    if (response) {
      if (response.status === 500) {
        console.log("Server Error:", response.data);
        message.error('Something Went Wrong On Server! Please Try Again Later')
      } else {
        return Promise.reject(response);
      }
    }
    console.log(error);
    return Promise.reject(error);
  },
);
export { DataService };
