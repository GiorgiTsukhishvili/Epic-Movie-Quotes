import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getAllUserInfo } from 'services';
import useAuth from './useAuth';

import { useEffect, useState } from 'react';

const useProfile = () => {
  useAuth();
  const { t } = useTranslation();

  const [message, setMessage] = useState({
    isShowing: false,
    isEmail: false,
    text: '',
    isError: false,
  });

  const addNewMessage = (
    text: string,
    isEmail: boolean = false,
    isError: boolean = false
  ) => {
    setMessage({ isShowing: true, text, isEmail, isError });

    setTimeout(
      () =>
        setMessage((prevMessage) => {
          return { ...prevMessage, isShowing: false };
        }),
      5000
    );
  };

  const { data } = useQuery('profile-info', getAllUserInfo, {
    refetchOnWindowFocus: false,
  });

  const { query, push } = useRouter();

  useEffect(() => {
    if (query.type === 'email-verified') {
      push('/profile');
      addNewMessage('user.profile.emailHasBeenVerified');
    }
  }, [query]);

  return {
    t,
    data,
    message,
    setMessage,
    addNewMessage,
  };
};

export default useProfile;
