import { Comment, Plus, SideNavbar, UserNavbar } from 'components';
import { useMoviesPage } from 'hooks';
import { GetServerSideProps } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import { getAllMovies } from 'services';
import { MovieTypes } from 'types';

const MoviePage = () => {
  const { t, data } = useMoviesPage();

  return (
    <div className='bg-gray-950 min-h-screen'>
      <UserNavbar />
      <div className='flex items-start'>
        <div className='hidden min-w-[26.875rem] lg:inline'>
          <SideNavbar />
        </div>
        <div className='w-full px-9 lg:pl-0 lg:pr-[4.375rem]'>
          <div className='w-full mt-[7.375rem] flex items-center justify-between'>
            <div className='flex flex-wrap items-center '>
              <h1 className=' text-white leading-[150%] text-2xl font-medium'>
                {t('user.allMovies.totalMovies')} &#160;
              </h1>
              <h1 className=' text-white leading-[150%] text-base lg:text-2xl font-medium'>
                {t('user.allMovies.totalSecond')}
                {data?.data.length})
              </h1>
            </div>

            <button className='flex gap-2  justify-center items-center bg-red-650 text-white px-[1.125rem] py-[0.625rem] rounded-md text-xl leading-[150%]'>
              <Plus />

              {t('user.allMovies.addMovie')}
            </button>
          </div>

          <div className='flex flex-wrap justify-center items-center mt-9 lg:mt-[4.25rem] gap-12'>
            {data?.data.map((movie: MovieTypes) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <Image
                  src={movie.image}
                  alt='movie-img'
                  width={440}
                  height={370}
                  priority
                  className='lg:w-[27.5rem] lg:h-[23.125rem] w-[22.375rem] h-auto rounded-xl'
                />
                <h1 className='text-white text-2xl leading-[150%] mt-4 font-medium'>
                  {JSON.parse(movie.name)[i18n?.language!]} ({movie.date})
                </h1>
                <h1 className='text-white text-2xl leading-[150%] mt-4 font-medium flex gap-3 items-center'>
                  {movie.quotes_count}
                  <Comment />
                </h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['movies'], getAllMovies);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default MoviePage;
