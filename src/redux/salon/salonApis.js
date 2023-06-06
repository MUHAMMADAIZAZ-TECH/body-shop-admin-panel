import axios from 'axios';
// const headers = { 'Content-Type': 'application/json'};
export const getsalons = async () => {
    try {
      const { data } = await axios.get(`http://192.168.0.122:3001/api/v1/salons/all`);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Error", error);
      return error;
    }
  }