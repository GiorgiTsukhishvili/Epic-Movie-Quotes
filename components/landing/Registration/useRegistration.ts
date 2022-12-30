import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  } = useForm<RegistrationTypes>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const { name, email, password, password_confirmation } = getValues();

  const onSubmit = (
    data: RegistrationTypes,
    setWhichForm: Dispatch<SetStateAction<string>>
  ) => {
    setWhichForm('registration-sent');
    console.log(data);
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
