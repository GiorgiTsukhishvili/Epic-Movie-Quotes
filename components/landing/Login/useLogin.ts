import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginFormTypes } from './loginTypes';
import { fetchCSRFToken, userLogin } from 'services';

const useLogin = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<LoginFormTypes>({
    mode: 'onChange',
    defaultValues: { login: '', password: '', remember: false },
  });

  const { login, password } = getValues();

  const onSubmit = async (data: LoginFormTypes) => {
    try {
      await fetchCSRFToken();
      const response = await userLogin(data);
      console.log(response);
    } catch (err) {
      setError('login', { type: 'all', message: t('errors.incorrectLogin')! });
      setError('password', { type: 'all', message: '' });
    }
  };

  return { t, register, handleSubmit, onSubmit, errors, login, password };
};

export default useLogin;
