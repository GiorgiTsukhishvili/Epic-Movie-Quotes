import { RegistrationTypes } from 'components/landing/Registration/registrationTypes';
import { instance } from 'services';

export const sendUserRegisterData = (data: RegistrationTypes) => {
  return instance.post('/register', data);
};
