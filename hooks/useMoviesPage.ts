import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getAllMovies } from 'services';
import useAuth from './useAuth';

const useMoviesPage = () => {
  const { t } = useTranslation();
  const { data } = useQuery(['movies'], getAllMovies);
  const { register, handleSubmit } = useForm<{ search: string }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  });
  useAuth();

  const onSubmit = (data: { search: string }) => {
    console.log();
  };

  return { t, data, register, onSubmit, handleSubmit };
};

export default useMoviesPage;
