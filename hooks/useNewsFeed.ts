import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { getAllQuotes } from 'services';
import useAuth from './useAuth';

const useNewsFeed = () => {
  useAuth();
  const { t } = useTranslation();
  const { replace, query } = useRouter();

  const { fetchNextPage, hasNextPage, data, isSuccess } = useInfiniteQuery(
    ['quotes', query],
    (pageParam) => getAllQuotes(pageParam as { pageParam: number }, query),
    {
      getNextPageParam: (page) =>
        page.data.last_page === page.data.current_page
          ? undefined
          : page.data.current_page + 1,
    }
  );

  const { register, handleSubmit, setValue } = useForm<{ search: string }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  });
  useAuth();

  const queryClient = useQueryClient();

  const onSubmit = (data: { search: string }) => {
    replace({ query: data });
    queryClient.invalidateQueries({ queryKey: 'movies' });
    setValue('search', '');
  };

  return {
    fetchNextPage,
    hasNextPage,
    data,
    isSuccess,
    t,
    handleSubmit,
    register,
    onSubmit,
  };
};

export default useNewsFeed;
