import { AxiosResponse } from 'axios';
import { axios } from 'services';
import { UserAllInfoTypes } from 'types';

export const getAllUserInfo = (): Promise<AxiosResponse<UserAllInfoTypes>> => {
  return axios.get('/api/profile-info');
};

export const updateUserInfo = (data: FormData) => {
  return axios.post('/api/profile-update?_method=put', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteEmail = (id: number) => {
  return axios.delete(`/api/email/${id}`);
};

export const makePrimary = (id: number) => {
  return axios.get(`/api/make-email-primary/${id}`);
};
