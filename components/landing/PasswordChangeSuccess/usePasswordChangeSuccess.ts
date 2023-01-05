import { useTranslation } from 'next-i18next';

const usePasswordChangeSuccess = () => {
  const { t } = useTranslation();
  return { t };
};

export default usePasswordChangeSuccess;
