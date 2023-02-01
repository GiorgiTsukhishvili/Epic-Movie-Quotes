import {
  AddQuoteNewsFeed,
  NewsFeedQuotes,
  NoSSRWrapper,
  SearchIcon,
  SideNavbar,
  UserNavbar,
} from 'components';
import useNewsFeed from 'hooks/useNewsFeed';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NewsFeedPageProps } from 'types';

const NewsFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    t,
    handleSubmit,
    register,
    onSubmit,
  } = useNewsFeed();

  return (
    <Fragment>
      <Head>
        <title>Movie Quotes - News Feed</title>
      </Head>

      <div className='bg-gray-950 min-h-screen'>
        <UserNavbar isNewsFeed={true} />
        <div className='flex items-start'>
          <div className='hidden lg:min-w-[16.575rem] xl:min-w-[26.575rem] lg:inline'>
            <SideNavbar isNewsFeed={true} />
          </div>
          <div className=' w-full lg:w-full lg:mr-4 mr-0 lg:max-w-[58.625rem] pt-[5.375rem] lg:pt-[7.375rem] pb-12 self-start'>
            <div className='w-full min-w-full flex items-center mb-4'>
              <AddQuoteNewsFeed />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='justify-center items-center hidden lg:flex'
              >
                <label
                  className=' translate-x-5 cursor-pointer'
                  htmlFor='search'
                >
                  <SearchIcon />
                </label>
                <NoSSRWrapper>
                  <input
                    type='text'
                    className='bg-transparent border-0 text-gray-350 pl-9 ring-0 placeholder:text-gray-350 focus:ring-0 focus:outline-0 focus:border-b focus:border-b-gray-350  w-[8.125rem] focus:w-[27vw]  xl:focus:w-[35vw] duration-300'
                    placeholder={t('user.newsFeed.searchBy')!}
                    {...register('search')}
                    id='search'
                    onFocus={(e) =>
                      (e.target.placeholder = t(
                        'user.newsFeed.desktopPlaceholder'
                      )!)
                    }
                    onBlur={(e) =>
                      (e.target.placeholder = t('user.newsFeed.searchBy')!)
                    }
                  />
                </NoSSRWrapper>
              </form>
            </div>
            {isSuccess && data && (
              <InfiniteScroll
                next={fetchNextPage}
                hasMore={hasNextPage!}
                dataLength={data?.pages.length * 3}
                loader
                className='min-w-full'
              >
                {data.pages.map((data) => (
                  <Fragment key={data.data.current_page}>
                    <NewsFeedQuotes
                      data={data.data.data as NewsFeedPageProps[]}
                    />
                  </Fragment>
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default NewsFeed;
