import {
  ArrowRight,
  MessageClose,
  Primary,
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
  const { t, data, message, setMessage, addNewMessage } = useProfile();

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
            {message.isShowing ? (
              <Fragment>
                <div
                  className='bg-landing-gradient h-screen w-screen fixed z-[60] lg:hidden opacity-70 top-0 left-0'
                  onClick={() =>
                    setMessage((prevMessage) => {
                      return { ...prevMessage, isShowing: false };
                    })
                  }
                />
                <div className='fixed  top-[7.875rem] right-[0.875rem] lg:top-[8.5rem] lg:right-[8.5rem] bg-green-350 max-w-[25rem] z-[70] lg:z-20 p-4 rounded-md'>
                  {message.isEmail ? (
                    <Fragment>
                      <div className='flex justify-between items-center '>
                        <h1 className='flex justify-center items-center gap-2 text-green-950 text-base leading-[150%] pr-8'>
                          <Primary isMessage={true} />
                          {t('user.profile.simpleAlert')}
                        </h1>
                        <span
                          className='cursor-pointer'
                          onClick={() =>
                            setMessage((prevMessage) => {
                              return { ...prevMessage, isShowing: false };
                            })
                          }
                        >
                          <MessageClose />
                        </span>
                      </div>
                      <h1 className=' text-neutral-950 text-base leading-[150%] mt-5'>
                        {t('user.profile.verifyNewEmail')}
                      </h1>
                    </Fragment>
                  ) : (
                    <div className='flex justify-between items-center '>
                      <h1 className='flex justify-center items-center gap-2 text-green-950 text-base leading-[150%] pr-8'>
                        <Primary isMessage={true} /> {t(message.text)}
                      </h1>
                      <span
                        className='cursor-pointer'
                        onClick={() =>
                          setMessage((prevMessage) => {
                            return { ...prevMessage, isShowing: false };
                          })
                        }
                      >
                        <MessageClose />
                      </span>
                    </div>
                  )}
                </div>
              </Fragment>
            ) : (
              <></>
            )}

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
              {data && (
                <ProfilePageDesktop
                  data={data?.data}
                  addNewMessage={addNewMessage}
                />
              )}
            </div>

            <div className='w-screen lg:hidden block'>
              {data && (
                <ProfilePageMobile
                  data={data?.data}
                  addNewMessage={addNewMessage}
                />
              )}
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
