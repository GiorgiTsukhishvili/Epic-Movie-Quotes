import { useQuery } from 'hooks';
import { useTranslation } from 'next-i18next';
import { sendRegistrationVerification } from 'services';

const useSuccessMessage = () => {
  const { t } = useTranslation();

  const { query, replace, pathname } = useQuery();

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

  try {
    let url = new URL(query['register-link']?.toString()!);
    let params = new URLSearchParams(url.search);
    params.delete('expires');
    params.append('token', query.token as string);
    params.append('signature', query.signature as string);

    const link = url.href + '&' + params;

    const sendVerificationLink = async () => {
      await sendRegistrationVerification(link);
    };

    if (query['register-link']) {
      sendVerificationLink();
    }
  } catch (err) {
    replace({ pathname }, '/');
  }

  return { t };
};

export default useSuccessMessage;
