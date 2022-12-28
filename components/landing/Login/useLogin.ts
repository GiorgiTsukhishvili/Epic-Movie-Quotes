import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginFormTypes } from './loginTypes';

const useLogin = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormTypes>({
    mode: 'onChange',
    defaultValues: { login: '', password: '', remember: false },
  });

  const { login, password } = getValues();
  const onSubmit = (data: LoginFormTypes) => {
    console.log(data);
  };

  return { t, register, handleSubmit, onSubmit, errors, login, password };
};

export default useLogin;
