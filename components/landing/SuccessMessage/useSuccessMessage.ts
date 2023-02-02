import { AxiosError } from 'axios';
import { useQuery as myUseQuery } from 'hooks';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { sendRegistrationVerification } from 'services';

const useSuccessMessage = () => {
  const { t } = useTranslation();

  const { query, push } = myUseQuery();

  let link: string;

  if (query['register-link']) {
    try {
      let url = new URL(query['register-link']?.toString()!);
      let params = new URLSearchParams(url.search);
      params.delete('expires');
      params.append('token', query.token as string);
      params.append('signature', query.signature as string);

      link = url.href + '&' + params;
    } catch (err) {
      push('/403');
    }
  }

  useQuery('sendVerifyEmail', () => sendRegistrationVerification(link), {
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          push('/403');
        } else {
          push('/403');
        }
      }
    },
    enabled: !!query['register-link'],
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { t };
};

export default useSuccessMessage;
