import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteMovie, deleteQuote, getSingleMovie } from 'services';
import { useAuth } from 'hooks';

const useSingleMoviePage = (id: string) => {
  const { push, query } = useRouter();
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

  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movie']);
      push(`/movies/${id}`);
    },
  });

  const removeQuote = (id: number) => {
    mutate(id);
  };

  const quotes = data ? data?.data[0].quotes.sort((a, b) => b.id - a.id) : [];

  const { t } = useTranslation();

  return {
    t,
    data,
    removeMovie,
    isAddQuoteOpen,
    setIsAddQuoteOpen,
    quotes,
    query,
    removeQuote,
  };
};

export default useSingleMoviePage;
