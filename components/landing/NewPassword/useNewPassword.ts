import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { NewPasswordTypes } from './newPassowrdTypes';

const useNewPassword = () => {
  const { t } = useTranslation();
  const [passwordsVisible, setPasswordsVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    control,
  } = useForm<NewPasswordTypes>({
    mode: 'onChange',
    defaultValues: { password: '', password_confirmation: '' },
  });

  useWatch({ control, name: 'password' });

  const { password, password_confirmation } = getValues();

  const onSubmit = (data: NewPasswordTypes) => {
    console.log(data);
  };

  return {
    t,
    register,
    errors,
    password,
    password_confirmation,
    handleSubmit,
    onSubmit,
    passwordsVisible,
    setPasswordsVisible,
  };
};

export default useNewPassword;
