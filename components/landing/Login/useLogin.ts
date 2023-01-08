import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginFormTypes } from './loginTypes';
import { fetchCSRFToken, userLogin } from 'services';
import { deleteCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'state';
import { useRouter } from 'next/router';

const useLogin = () => {
  const { push } = useRouter();
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
  const dispatch = useDispatch();

  const { login, password } = getValues();

  const onSubmit = async (data: LoginFormTypes) => {
    try {
      await fetchCSRFToken();
      const response = await userLogin(data);
      dispatch(updateUserData(response.data.user));
      push('news-feed');
    } catch (err) {
      setError('login', { type: 'all', message: t('errors.incorrectLogin')! });
      setError('password', { type: 'all', message: '' });
      deleteCookie('XSRF-TOKEN');
    }
  };

  return { t, register, handleSubmit, onSubmit, errors, login, password };
};

export default useLogin;
