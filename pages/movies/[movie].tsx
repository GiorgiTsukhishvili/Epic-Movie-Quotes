import { useSingleMoviePage } from 'hooks';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate, QueryClient } from 'react-query';
import { getSingleMovie } from 'services';

const Movie = ({ name }: { name: string }) => {
  const { t, data } = useSingleMoviePage(name);
  console.log(data);
  return <div>Movie</div>;
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['movie'], () =>
    getSingleMovie(`/api/movie/${params?.movie}`)
  );

  return {
    props: {
      name: params?.movie,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default Movie;
