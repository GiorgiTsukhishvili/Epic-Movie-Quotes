import { useTranslation } from 'next-i18next';

const useProfileSubmitMobile = () => {
  const { t } = useTranslation();

  return { t };
};

export default useProfileSubmitMobile;
