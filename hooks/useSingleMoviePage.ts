import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { deleteMovie, getSingleMovie } from 'services';
import useAuth from './useAuth';

const useSingleMoviePage = (id: string) => {
  const { push } = useRouter();
  const { data } = useQuery(['movie'], () =>
    getSingleMovie(`/api/movie/${id}`)
  );
  useAuth();

  const removeMovie = async () => {
    try {
      await deleteMovie(id);
      push('/movies');
    } catch (err) {
      push('/403');
    }
  };

  const { t } = useTranslation();
  return { t, data, removeMovie };
};

export default useSingleMoviePage;
