import { useRouter } from 'next/router';

const useQuery = () => {
  const { query, replace, pathname, push } = useRouter();

  return { query, replace, pathname, push };
};

export default useQuery;
