import { useTranslation } from 'next-i18next';

const useSuccessMessage = () => {
  const { t } = useTranslation();

  return { t };
};

export default useSuccessMessage;
