import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteMovie, deleteQuote, getSingleMovie } from 'services';
import { useAuth } from 'hooks';

const useSingleMoviePage = (id: string) => {
  const { push, query } = useRouter();
  const { data } = useQuery(['movie'], () => getSingleMovie(id), {
    retry: false,
    onError: () => {
      push('/404');
    },
  });

  console.log(data);

  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState<boolean>(false);
  const [isEditMovieOpen, setIsEditMovieOpen] = useState<boolean>(false);

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

  const quotes = data ? data?.data.quotes.sort((a, b) => b.id - a.id) : [];

  const editMovieFormData = {
    'name-en': data?.data.name['en'],
    'name-ka': data?.data.name['ka'],
    'director-en': data?.data.director['en'],
    'director-ka': data?.data.director['ka'],
    budget: data?.data.budget,
    date: data?.data.date,
    'description-en': data?.data.description['en'],
    'description-ka': data?.data.description['ka'],
    image: data?.data.image,
    tags: data?.data.tags.map((tag) => tag.pivot.tag_id.toString()),
  };

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
    isEditMovieOpen,
    setIsEditMovieOpen,
    editMovieFormData,
  };
};

export default useSingleMoviePage;
