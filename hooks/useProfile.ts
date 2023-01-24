import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { getAllUserInfo } from 'services';
import useAuth from './useAuth';

const useProfile = () => {
  useAuth();
  const { t } = useTranslation();

  const { data } = useQuery('profile-info', getAllUserInfo, {
    refetchOnWindowFocus: false,
  });

  return {
    t,
    data,
  };
};

export default useProfile;
