import { useTranslation } from 'next-i18next';

const useProfileNameMobile = () => {
  const { t } = useTranslation();

  return { t };
};

export default useProfileNameMobile;
