import {
  ListOfQuotes,
  Pencil,
  Plus,
  SideNavbar,
  TrashCan,
  UserNavbar,
} from 'components';
import { useSingleMoviePage } from 'hooks';
import { GetServerSideProps } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { dehydrate, QueryClient } from 'react-query';
import { getSingleMovie } from 'services';

const Movie = ({ name }: { name: string }) => {
  const { t, data, removeMovie } = useSingleMoviePage(name);

  return (
    <div className='bg-gray-950 min-h-screen'>
      <UserNavbar />
      <div className='flex items-start'>
        <div className='hidden min-w-[26.875rem] lg:inline'>
          <SideNavbar />
        </div>
        <div className='w-full lg:pr-[4.375rem] mt-[7.375rem] '>
          <h1 className='text-2xl  px-9 lg:pl-0 font-medium leading-[150%] text-white hidden lg:block'>
            {t('user.singleMovie.topHeader')}
          </h1>
          <div className='lg:mt-8  pl-9 lg:pl-0 mt-0 flex gap-6 xl:flex-row flex-col'>
            {data?.data[0].image && (
              <Image
                src={data?.data[0].image}
                alt='movie-image'
                width={809}
                height={441}
                priority
                className='w-[22.375rem] h-[18.875rem] lg:w-[50.56rem] 2xl:min-w-[50.56rem] lg:h-[27.5rem] rounded-xl object-cover'
              />
            )}

            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-medium leading-[150%] text-orange-250'>
                  {data && JSON.parse(data?.data[0].name)[i18n?.language!]} (
                  {data?.data[0].date})
                </h1>

                <div className=' bg-zinc-750 rounded-md py-2.5 px-7 lg:flex hidden'>
                  <span className='pr-6 border-r border-r-gray-550 cursor-pointer'>
                    <Pencil />
                  </span>
                  <span className='ml-6 cursor-pointer' onClick={removeMovie}>
                    <TrashCan />
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                {data &&
                  data.data[0].tags.split(',').map((tag) => (
                    <h1
                      key={tag}
                      className='text-white font-bold text-lg bg-gray-550 h-8 px-3 rounded-md'
                    >
                      {tag}
                    </h1>
                  ))}
              </div>
              <h1 className='text-gray-350 font-bold text-lg leading-[150%]'>
                {t('user.singleMovie.director')}:&#160;
                {data && JSON.parse(data?.data[0].director)[i18n?.language!]}
              </h1>
              <h1 className='text-gray-350 font-bold text-lg leading-[150%]'>
                {t('user.singleMovie.budget')}:&#160;
                {data?.data[0].budget &&
                  data &&
                  JSON.parse(data?.data[0].budget)[i18n?.language!]}
                $
              </h1>
              <h1 className='text-gray-350 font-normal text-lg leading-[150%] '>
                {data && JSON.parse(data?.data[0].description)[i18n?.language!]}
              </h1>
            </div>
          </div>
          <div className='mt-11  px-9 lg:pl-0 lg:flex-row flex flex-col-reverse items-start lg:items-center'>
            <h1 className='text-white text-2xl w-full lg:w-auto leading-[150%] pt-10 border-t border-t-gray-350 lg:pt-0 lg:border-t-0 lg:pr-4 lg:border-r lg:border-r-gray-350'>
              {t('user.singleMovie.totalQuotes')}{' '}
              {data && data.data[0].quotes.length})
            </h1>

            <button className='flex gap-2 mb-10 lg:mb-0 lg:ml-4  justify-center items-center bg-red-650 text-white px-[1.125rem] py-[0.625rem] rounded-md text-xl leading-[150%]'>
              <Plus />
              {t('user.singleMovie.addQuote')}
            </button>
          </div>
          <div className='lg:mt-16 mt-9 flex flex-col lg:gap-10 gap-8'>
            {data &&
              data.data[0].quotes.map((quote) => (
                <ListOfQuotes key={quote.id} quote={quote} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
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
