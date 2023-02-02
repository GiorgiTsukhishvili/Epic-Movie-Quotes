import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginFormTypes } from './loginTypes';
import { fetchCSRFToken, redirectToGoogle, userLogin } from 'services';
import { deleteCookie, setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'state';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useLogin = () => {
  const { replace, push, query } = useRouter();
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
      replace('/news-feed');
      setCookie('isLoggedIn', true);
    } catch (err) {
      setError('login', { type: 'all', message: t('errors.incorrectLogin')! });
      setError('password', { type: 'all', message: '' });
      deleteCookie('XSRF-TOKEN');
      deleteCookie('isLoggedIn');
    }
  };

  const redirectGoogle = async () => {
    try {
      const response = await redirectToGoogle('login');

      push(response.data);
    } catch (err) {
      setError('login', { type: 'all', message: t('errors.incorrectLogin')! });
      setError('password', { type: 'all', message: '' });
    }
  };

  useEffect(() => {
    if (query.code && query.prompt) {
      setError('login', { type: 'all', message: t('errors.incorrectLogin')! });
      setError('password', { type: 'all', message: '' });
    }
  }, [query]);

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    login,
    password,
    redirectGoogle,
  };
};

export default useLogin;
