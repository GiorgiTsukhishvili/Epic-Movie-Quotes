import {
  AddQuoteNewsFeed,
  NewsFeedQuotes,
  SideNavbar,
  UserNavbar,
} from 'components';
import useNewsFeed from 'hooks/useNewsFeed';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NewsFeedPageProps } from 'types';

const NewsFeed = () => {
  const { data, fetchNextPage, hasNextPage, isSuccess } = useNewsFeed();

  return (
    <div className='bg-gray-950 min-h-screen'>
      <UserNavbar isNewsFeed={true} />
      <SideNavbar isNewsFeed={true} />
      <div className='lg:ml-[25rem] w-full lg:w-auto lg:mr-4 mr-0 lg:max-w-[58.625rem] pt-[5.375rem] lg:pt-[7.375rem] pb-12'>
        <div className='w-full flex items-center mb-4'>
          <AddQuoteNewsFeed />
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
                <NewsFeedQuotes data={data.data.data as NewsFeedPageProps[]} />
              </Fragment>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
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
