import { useInfiniteQuery } from 'react-query';
import { getAllQuotes } from 'services';
import useAuth from './useAuth';

const useNewsFeed = () => {
  useAuth();

  const { fetchNextPage, hasNextPage, data, isSuccess } = useInfiniteQuery(
    'quotes',
    (pageParam) => getAllQuotes(pageParam as { pageParam: number }),
    {
      getNextPageParam: (page) =>
        page.data.last_page === page.data.current_page
          ? undefined
          : page.data.current_page + 1,
    }
  );

  return { fetchNextPage, hasNextPage, data, isSuccess };
};

export default useNewsFeed;
