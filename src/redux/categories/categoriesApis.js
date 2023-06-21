import { DataService } from '../../config/dataService/mydataService';

export const getcategories = async () => {
  try {
    const { data } = await DataService.get(`/api/v1/categories`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getcategory = async (id) => {
  try {
    const { data } = await DataService.get(`/api/v1/categories/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const createcategory = async (body) => {
  try {
    const formData = new FormData();
    formData.append('name', body?.name);
    formData.append('files', body?.file);
    formData.append('description', body?.description);
    formData.append('color', body?.color);
    console.log(body);
    const { data } = await DataService.postFormData(`/api/v1/categories`, formData);
    return data;
  } catch (error) {
    return error;
  }
};
export const updatecategory = async (body) => {
  try {
    const formData = new FormData();
    formData.append('name', body?.name);
    formData.append('description', body?.description);
    formData.append('color', body?.color);
    if (body?.file !== undefined) {
      formData.append('files', body?.file);
    }
    const { data } = await DataService.patchFormData(`/api/v1/categories/${body.id}`, formData);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
export const deletecategory = async (body) => {
  try {
    const { data } = await DataService.delete(`/api/v1/categories/${body.id}`);
    body.getData();
    return data;
  } catch (error) {
    return error;
  }
};
