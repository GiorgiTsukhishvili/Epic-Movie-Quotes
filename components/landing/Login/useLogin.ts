import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LoginFormTypes } from './loginTypes';
import {
  callbackGoogle,
  fetchCSRFToken,
  redirectToGoogle,
  userLogin,
} from 'services';
import { deleteCookie, setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'state';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const useLogin = () => {
  const { replace, push, asPath, query } = useRouter();
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

  const handleGoogleAuth = async () => {
    try {
      await fetchCSRFToken();
      const response = await callbackGoogle(asPath, 'login');

      setCookie('isAuth', true);
      dispatch(updateUserData(response.data.user));
      replace('/news-feed');
      setCookie('isLoggedIn', true);
    } catch (error) {
      setError('login', { type: 'all', message: t('errors.incorrectLogin')! });
      setError('password', { type: 'all', message: '' });
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
    login,
    password,
    redirectGoogle,
  };
};

export default useLogin;
