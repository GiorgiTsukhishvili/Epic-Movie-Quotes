import { RegistrationTypes } from 'components/landing/Registration/registrationTypes';
import { axios } from 'services';
import { i18n } from 'next-i18next';

export const sendUserRegisterData = (data: RegistrationTypes) => {
  return axios.post('/register', { ...data, lang: i18n?.language });
};

export const sendRegistrationVerification = (link: string) => {
  return axios.get(link);
};
