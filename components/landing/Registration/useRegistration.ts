import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { sendUserRegisterData } from 'services';
import { RegistrationTypes } from './registrationTypes';

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
    const response = await sendUserRegisterData(data);

    if (response.status === 201) {
      setWhichForm('registration-sent');
    } else if (response.data.errors.name) {
      setError('name', { type: 'custom', message: t('errors.name')! });
    } else if (response.data.errors.name) {
      setError('email', { type: 'custom', message: t('errors.email')! });
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
