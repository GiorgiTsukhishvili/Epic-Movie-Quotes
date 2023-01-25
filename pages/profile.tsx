import {
  ArrowRight,
  ProfilePageDesktop,
  ProfilePageMobile,
  SideNavbar,
  UserNavbar,
} from 'components';
import { useProfile } from 'hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';

const Profile = () => {
  const { t, data } = useProfile();

  return (
    <Fragment>
      <Head>
        <title>Movie Quotes - Profile</title>
      </Head>
      <div className='bg-gray-950 min-h-screen'>
        <UserNavbar isProfilePage={true} />
        <div className='flex items-start'>
          <div className='hidden lg:min-w-[16.575rem] xl:min-w-[26.575rem] lg:inline'>
            <SideNavbar isProfilePage={true} />
          </div>
          <div className=' lg:mr-4 mr-0  pt-[5.375rem] lg:w-full lg:max-w-[61.75rem] lg:pt-[7.375rem] pb-12'>
            <h1 className='text-white leading-[150%] text-2xl font-medium hidden lg:block mb-[7.875rem] ml-[3.75rem]'>
              {t('user.profile.myProfile')}
            </h1>
            <Link
              href={{ pathname: '/news-feed' }}
              className='block lg:hidden ml-10 my-6 cursor-pointer'
            >
              <ArrowRight isLogout={true} />
            </Link>
            <div className='w-full lg:block hidden'>
              {data && <ProfilePageDesktop data={data?.data} />}
            </div>

            <div className='w-screen lg:hidden block'>
              {data && <ProfilePageMobile data={data?.data} />}
            </div>
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

export default Profile;
