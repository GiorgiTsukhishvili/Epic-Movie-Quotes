import { useRouter } from 'next/router';

const useQuery = () => {
  const { query, replace, pathname } = useRouter();

  return { query, replace, pathname };
};

export default useQuery;
