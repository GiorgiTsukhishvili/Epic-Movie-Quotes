import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { getAllMovies } from 'services';
import useAuth from './useAuth';

const useMoviesPage = () => {
  const { t } = useTranslation();
  const { push, query, replace } = useRouter();
  const [isAddMovieOpen, setIsAddMovieOpen] = useState<boolean>(false);
  const { data } = useQuery(['movies', query], () => getAllMovies(query), {
    onError: () => push('/403'),
  });

  const { register, handleSubmit } = useForm<{ search: string }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  });
  useAuth();

  const queryClient = useQueryClient();

  const onSubmit = (data: { search: string }) => {
    replace({ query: data });

    queryClient.invalidateQueries({ queryKey: 'movies' });
  };

  return {
    t,
    data,
    register,
    onSubmit,
    handleSubmit,
    isAddMovieOpen,
    setIsAddMovieOpen,
  };
};

export default useMoviesPage;
