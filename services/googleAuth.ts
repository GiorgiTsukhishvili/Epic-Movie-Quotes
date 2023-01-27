import { i18n } from 'next-i18next';
import { axios } from 'services';

export const redirectToGoogle = (type: string) => {
  return axios.get(`/api/google-auth/${i18n?.language}/${type}`);
};

export const callbackGoogle = (path: string, type: string) => {
  return axios.get(
    `/api/auth/google/callback/${i18n?.language}/${type}${path}`
  );
};
