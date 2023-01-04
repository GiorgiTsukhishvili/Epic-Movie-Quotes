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

  const link =
    query['register-link'] +
    '&signature=' +
    query.signature +
    '&token=' +
    query.token;

  const sendVerificationLink = async () => {
    await sendRegistrationVerification(link);
  };

  if (query['register-link']) {
    sendVerificationLink();
  }

  return { t };
};

export default useSuccessMessage;
