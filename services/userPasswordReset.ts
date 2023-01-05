import { ForgotPasswordTypes } from 'components/landing/ForgotPassword/forgotTypes';
import { i18n } from 'next-i18next';
import { axios } from 'services';

export const sendUserResetEmail = (data: ForgotPasswordTypes) => {
  return axios.post('/password-reset', { ...data, lang: i18n?.language });
};
