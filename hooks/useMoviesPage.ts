import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { getAllMovies } from 'services';
import useAuth from './useAuth';

const useMoviesPage = () => {
  const { t } = useTranslation();
  const { data } = useQuery(['movies'], getAllMovies);
  useAuth();

  return { t, data };
};

export default useMoviesPage;
