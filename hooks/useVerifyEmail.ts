import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { sendEmailVerification } from 'services';

const useVerifyEmail = () => {
  const { t } = useTranslation();

  const { query, push } = useRouter();

  let link: string;

  const queryClient = useQueryClient();

  const sendEmailData = () => {
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

          if (getCookie('isLoggedIn')) {
            push('/profile?type=email-verified');
          } else {
            push('/?type=email-verified');
          }
        } catch (err) {
          push('/403');
        }
      };

      sendVerify();
    } catch (err) {
      push('/403');
    }
  };

  useQuery({
    queryKey: ['email-verification'],
    queryFn: sendEmailData,
    enabled: !!query['verification-link'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  return { t };
};

export default useVerifyEmail;
