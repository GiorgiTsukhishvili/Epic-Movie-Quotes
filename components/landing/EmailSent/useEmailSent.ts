import { useTranslation } from 'next-i18next';

const useEmailSent = () => {
  const { t } = useTranslation();

  return { t };
};

export default useEmailSent;
