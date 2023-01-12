import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { fetchCSRFToken, sendUserRegisterData } from 'services';
import { RegistrationTypes } from './registrationTypes';
import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';

const useRegistration = () => {
  const { t } = useTranslation();
  const [passwordsVisible, setPasswordsVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    setError,
  } = useForm<RegistrationTypes>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  useWatch({ control, name: 'password' });

  const { name, email, password, password_confirmation } = getValues();

  const onSubmit = async (
    data: RegistrationTypes,
    setWhichForm: Dispatch<SetStateAction<string>>
  ) => {
    try {
      await fetchCSRFToken();
      const response = await sendUserRegisterData(data);
      if (response.status === 201) {
        setWhichForm('registration-sent');
      }
    } catch (err) {
      deleteCookie('XSRF-TOKEN');
      if (err instanceof AxiosError) {
        if (err.response!.data.errors.name) {
          setError('name', { type: 'all', message: t('errors.name')! });
        }
        if (err.response!.data.errors.email) {
          setError('email', { type: 'all', message: t('errors.email')! });
        }
      }
    }
  };

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    name,
    email,
    password,
    password_confirmation,
    passwordsVisible,
    setPasswordsVisible,
  };
};

export default useRegistration;
