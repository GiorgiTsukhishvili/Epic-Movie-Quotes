import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { getAllUserInfo } from 'services';
import useAuth from './useAuth';
import { sendEmailVerification } from 'services';

const useProfile = () => {
  useAuth();
  const { t } = useTranslation();

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
  };
};

export default useProfile;
