import {
  AddQuote,
  EditMovie,
  EditQuote,
  ListOfQuotes,
  Pencil,
  Plus,
  SideNavbar,
  TrashCan,
  UserNavbar,
  ViewQuote,
} from 'components';
import { useSingleMoviePage } from 'hooks';
import { GetServerSideProps } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getSingleMovie } from 'services';

const Movie = ({ name }: { name: string }) => {
  const {
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
  } = useSingleMoviePage(name);

  return (
    <Fragment>
      <Head>
        <title>Movie Quotes - My Movie</title>
      </Head>
      <div className='bg-gray-950 min-h-screen'>
        <UserNavbar isMoviesPage={true} />
        <div className='flex items-start'>
          <div className='hidden lg:min-w-[16.575rem] xl:min-w-[26.575rem] lg:inline'>
            <SideNavbar isMoviesPage={true} />
          </div>
          <div className='w-full lg:pr-[4.375rem] mt-[7.375rem] pb-10'>
            <h1 className='text-2xl  px-9 lg:pl-0 font-medium leading-9.5 text-white hidden lg:block'>
              {t('user.singleMovie.topHeader')}
            </h1>
            <div className='lg:mt-8  pl-9 lg:pl-0 mt-0 flex gap-6 2xl:flex-row flex-col'>
              {data?.data.image && (
                <Image
                  src={data?.data.image}
                  alt='movie-image'
                  width={809}
                  height={441}
                  priority
                  className='w-[22.375rem] h-[18.875rem] lg:w-[50.56rem] 2xl:min-w-[50.56rem] lg:h-[27.5rem] rounded-xl object-cover'
                />
              )}

              <div className='flex flex-col  gap-4 w-full'>
                <div className='flex justify-between items-center lg:flex-wrap w-full'>
                  <h1 className='text-2xl font-medium leading-9.5 text-orange-250'>
                    {data && data?.data.name[i18n?.language! as 'en' | 'ka']}(
                    {data?.data.date})
                  </h1>

                  <div className=' bg-zinc-750 rounded-md py-2.5 px-7 lg:flex  hidden'>
                    <span
                      className='pr-6 border-r border-r-gray-550 cursor-pointer'
                      onClick={() => setIsEditMovieOpen(true)}
                    >
                      <Pencil />
                    </span>
                    <span className='ml-6 cursor-pointer' onClick={removeMovie}>
                      <TrashCan />
                    </span>
                  </div>
                </div>
                <div className='flex gap-2 flex-wrap'>
                  {data &&
                    data.data.tags.map((tag) => (
                      <h1
                        key={tag.id}
                        className='text-white font-bold text-lg bg-gray-550 h-8 px-3 rounded flex justify-center items-center'
                      >
                        {tag.tags[i18n?.language! as 'ka' | 'en']}
                      </h1>
                    ))}
                </div>
                <h1 className='text-gray-350 font-bold text-lg leading-9.5'>
                  {t('user.singleMovie.director')}:&#160;
                  {data &&
                    (data?.data.director)[i18n?.language! as 'en' | 'ka']}
                </h1>
                <h1 className='text-gray-350 font-bold text-lg leading-9.5'>
                  {t('user.singleMovie.budget')}:&#160;
                  {data?.data.budget &&
                    data &&
                    data?.data.budget.replace(
                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                      '.'
                    )}
                  $
                </h1>
                <h1 className='text-gray-350 font-normal text-lg leading-9.5 '>
                  {data &&
                    (data?.data.description)[i18n?.language! as 'en' | 'ka']}
                </h1>
              </div>
            </div>
            <div className='mt-11  px-9 lg:pl-0 lg:flex-row flex flex-col-reverse items-start lg:items-center'>
              <h1 className='text-white text-2xl w-full lg:w-auto leading-9.5 pt-10 border-t border-t-gray-350 lg:pt-0 lg:border-t-0 lg:pr-4 lg:border-r lg:border-r-gray-350'>
                {t('user.singleMovie.totalQuotes')}{' '}
                {data && data.data.quotes.length})
              </h1>

              <button
                onClick={() => setIsAddQuoteOpen(true)}
                className='flex gap-2 mb-10 lg:mb-0 lg:ml-4  justify-center items-center bg-red-650 text-white px-[1.125rem] py-[0.625rem] rounded-md text-xl leading-9.5'
              >
                <Plus />
                {t('user.singleMovie.addQuote')}
              </button>
            </div>
            <div className='lg:mt-16 mt-9 flex flex-col lg:gap-10 gap-8'>
              {data &&
                quotes.map((quote) => (
                  <ListOfQuotes
                    key={quote.id}
                    quote={quote}
                    removeQuote={removeQuote}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {isAddQuoteOpen && data && (
        <AddQuote
          name={data?.data.name}
          director={data?.data.director}
          image={data?.data.image}
          id={data?.data.id}
          date={data?.data.date}
          tags={data?.data.tags}
          setIsAddQuoteOpen={setIsAddQuoteOpen}
        />
      )}

      {query.mode === 'edit' && data && (
        <EditQuote
          quoteId={+query['quote-id']!}
          movieId={data?.data.id}
          quoteImage={
            quotes.find((quote) => quote.id === +query['quote-id']!)
              ? quotes.find((quote) => quote.id === +query['quote-id']!)!.image
              : ''
          }
          quoteText={
            quotes.find((quote) => quote.id === +query['quote-id']!)!
              ? quotes.find((quote) => quote.id === +query['quote-id']!)!.quote
              : { en: '', ka: '' }
          }
          removeQuery={removeQuote}
        />
      )}

      {query.mode === 'view' && (
        <ViewQuote quoteId={+query['quote-id']!} removeQuery={removeQuote} />
      )}

      {isEditMovieOpen && (
        <EditMovie
          setIsEditMovieOpen={setIsEditMovieOpen}
          formData={editMovieFormData}
        />
      )}
    </Fragment>
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
