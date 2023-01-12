import { SideNavbar, UserNavbar } from 'components';
import { useAuth } from 'hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const NewsFeed = () => {
  useAuth();

  return (
    <div className='bg-gray-950 min-h-screen'>
      <UserNavbar isNewsFeed={true} />
      <div className='flex justify-between items-center'>
        <SideNavbar isNewsFeed={true} />
        <div></div>
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
