import { useEffect, useState } from 'react';
import { LandingPageFormTypes } from 'types';
import { callbackGoogle, fetchCSRFToken } from 'services';
import { setCookie } from 'cookies-next';
import { updateUserData } from 'state';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';

const useFormChooser = () => {
  const [whichForm, setWhichForm] = useState<LandingPageFormTypes>('');
  const { replace, asPath, query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.type === 'email-verified') {
      setWhichForm('email-verified');
    }
  }, [query]);

  const handleGoogleAuth = async () => {
    try {
      await fetchCSRFToken();
      let response: AxiosResponse;

      if (query.type === 'register') {
        response = await callbackGoogle(asPath, 'register');
      }

      if (query.type === 'login') {
        response = await callbackGoogle(asPath, 'login');
      }

      setCookie('isAuth', true);
      dispatch(updateUserData(response!.data.user));
      replace('/news-feed');
      setCookie('isLoggedIn', true);
    } catch (error) {
      if (query.type === 'register') {
        setWhichForm('registration');
      }
      if (query.type === 'login') {
        setWhichForm('login');
      }
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

  return { whichForm, setWhichForm, query };
};

export default useFormChooser;
