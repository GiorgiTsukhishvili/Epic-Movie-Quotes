import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { deleteMovie, getSingleMovie } from 'services';
import useAuth from './useAuth';

const useSingleMoviePage = (id: string) => {
  const { push } = useRouter();
  const { data } = useQuery(['movie'], () => getSingleMovie(id));
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState<boolean>(false);
  useAuth();

  const removeMovie = async () => {
    try {
      await deleteMovie(id);
      push('/movies');
    } catch (err) {
      push('/403');
    }
  };

  const quotes = data ? data?.data[0].quotes.sort((a, b) => b.id - a.id) : [];

  const { t } = useTranslation();

  return { t, data, removeMovie, isAddQuoteOpen, setIsAddQuoteOpen, quotes };
};

export default useSingleMoviePage;
