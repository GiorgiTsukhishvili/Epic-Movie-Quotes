import { LoginFormTypes } from 'components/landing/Login/loginTypes';
import { axios } from 'services';

export const fetchCSRFToken = async () => {
  return axios.get('/sanctum/csrf-cookie');
};

export const userLogin = async (data: LoginFormTypes) => {
  return axios.post('/api/login', data);
};

export const userLogout = async () => {
  return axios.get('/api/logout');
};

export const fetchUserInfo = async () => {
  return axios.get('/api/user-info');
};
