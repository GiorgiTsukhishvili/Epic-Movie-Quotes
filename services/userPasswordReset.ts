import { ForgotPasswordTypes } from 'components/landing/ForgotPassword/forgotTypes';
import { NewPasswordTypes } from 'components/landing/NewPassword/newPassowrdTypes';
import { i18n } from 'next-i18next';
import { axios } from 'services';

export const sendUserResetEmail = (data: ForgotPasswordTypes) => {
  return axios.post('/password-reset', { ...data, lang: i18n?.language });
};

export const sendNewPasswordDetails = (
  link: string,
  data: NewPasswordTypes
) => {
  return axios.post(link, data);
};
