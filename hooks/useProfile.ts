import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { getAllUserInfo } from 'services';
import useAuth from './useAuth';
import { sendEmailVerification } from 'services';
import { useState } from 'react';

const useProfile = () => {
  useAuth();
  const { t } = useTranslation();

  const [message, setMessage] = useState({
    isShowing: false,
    isEmail: false,
    text: '',
  });

  const addNewMessage = (text: string, isEmail: boolean = false) => {
    setMessage({ isShowing: true, text, isEmail });

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

  let link: string;

  const queryClient = useQueryClient();

  if (query['verification-link']) {
    try {
      let url = new URL(query['verification-link']?.toString()!);
      let params = new URLSearchParams(url.search);
      params.delete('expires');
      params.append('token', query.token as string);
      params.append('signature', query.signature as string);

      link = url.href + '&' + params;

      const sendVerify = async () => {
        try {
          await sendEmailVerification(link);

          queryClient.invalidateQueries('profile-info');
        } catch (err) {
          push('/profile');
        }
      };

      sendVerify();
    } catch (err) {
      push('/403');
    }
  }
  return {
    t,
    data,
    message,
    setMessage,
    addNewMessage,
  };
};

export default useProfile;
