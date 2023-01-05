import { useQuery } from 'hooks';
import { useTranslation } from 'next-i18next';
import { sendRegistrationVerification } from 'services';

const useSuccessMessage = () => {
  const { t } = useTranslation();

  const { query, replace, pathname, push } = useQuery();

  if (query.lang) {
    replace(
      {
        pathname,
        query: {
          'register-link': query['register-link'],
          signature: query.signature,
          token: query.token,
        },
      },
      {
        pathname,
        query: {
          'register-link': query['register-link'],
          signature: query.signature,
          token: query.token,
        },
      },
      { locale: query.lang as string }
    );
  }

  let link: string;

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

  const sendVerificationLink = async () => {
    try {
      await sendRegistrationVerification(link);
    } catch (err) {
      push('/403');
    }
  };

  if (query['register-link']) {
    sendVerificationLink();
  }

  return { t };
};

export default useSuccessMessage;
