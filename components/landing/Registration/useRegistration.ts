import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  callbackGoogle,
  fetchCSRFToken,
  redirectToGoogle,
  sendUserRegisterData,
} from 'services';
import { RegistrationTypes } from './registrationTypes';
import { AxiosError } from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { updateUserData } from 'state';
import { useDispatch } from 'react-redux';

const useRegistration = () => {
  const { t } = useTranslation();
  const [passwordsVisible, setPasswordsVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  const dispatch = useDispatch();

  const { push, asPath, query, replace } = useRouter();

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

  const redirectGoogle = async () => {
    try {
      await fetchCSRFToken();
      const response = await redirectToGoogle('register');

      push(response.data);
    } catch (err) {
      setError('name', { type: 'all', message: t('errors.email')! });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await fetchCSRFToken();
      const response = await callbackGoogle(asPath, 'register');

      setCookie('isAuth', true);
      dispatch(updateUserData(response.data.user));
      replace('/news-feed');
      setCookie('isLoggedIn', true);
    } catch (error) {
      setError('email', { type: 'all', message: t('errors.email')! });
    }
  };

  useQuery({
    queryKey: ['callback-google', asPath],
    queryFn: handleGoogleAuth,
    enabled: !!query.code && !!query.prompt,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

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
    redirectGoogle,
  };
};

export default useRegistration;
