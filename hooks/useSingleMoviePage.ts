import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { getSingleMovie } from 'services';

const useSingleMoviePage = (id: string) => {
  const { data } = useQuery(['movie'], () =>
    getSingleMovie(`/api/movie/${id}`)
  );

  const { t } = useTranslation();
  return { t, data };
};

export default useSingleMoviePage;
