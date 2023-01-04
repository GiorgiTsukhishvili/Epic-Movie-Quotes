import { RegistrationTypes } from 'components/landing/Registration/registrationTypes';
import { instance } from 'services';
import { i18n } from 'next-i18next';

export const sendUserRegisterData = (data: RegistrationTypes) => {
  return instance.post('/register', { ...data, lang: i18n?.language });
};
