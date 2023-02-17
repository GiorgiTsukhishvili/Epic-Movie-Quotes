import {
  Burger,
  Camera,
  House,
  SearchIcon,
  useUserNavbar,
  ArrowRight,
  NoSSRWrapper,
  Notifications,
} from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { UserNavbarTypes } from './userNavbarTypes';

const UserNavbar: React.FC<UserNavbarTypes> = ({
  isNewsFeed,
  isMoviesPage,
  isProfilePage,
}) => {
  const {
    t,
    logoutUser,
    isMobileProfileOpen,
    setIsMobileProfileOpen,
    name,
    image,
    ref,
    setIsSearchOpen,
    isSearchOpen,
    register,
    onSubmit,
    handleSubmit,
  } = useUserNavbar();

  return (
    <Fragment>
      <div className='bg-neutral-950 z-40  fixed w-full  h-[5.375rem] ' />
      <div className='bg-white fixed z-40 w-full rotate--180 h-[5.375rem] flex justify-between items-center px-9 lg:px-[4.375rem] py-8 backdrop-filter backdrop-blur-user-page bg-opacity-5'>
        <Link
          href={'/news-feed'}
          className='uppercase text-orange-250 font-medium leading-9.5 hidden lg:inline'
        >
          movie quotes
        </Link>

        <button
          className='inline lg:hidden cursor-pointer'
          onClick={() => setIsMobileProfileOpen(true)}
        >
          <Burger />
        </button>

        <div className='flex justify-center items-center gap-10'>
          {isNewsFeed && (
            <Fragment>
              <div
                className='cursor-pointer inline lg:hidden'
                onClick={() => setIsSearchOpen(true)}
              >
                <SearchIcon />
              </div>
              {isSearchOpen && (
                <div className='w-screen h-screen fixed top-0 left-0 bg-neutral-850 z-50 inline lg:hidden'>
                  <div className='flex mt-6 pb-6 gap-6 items-center justify-start border-b border-b-border-transparent'>
                    <div
                      className='ml-8 cursor-pointer'
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <ArrowRight isSearchOpen={true} />
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='justify-center items-center '
                    >
                      <NoSSRWrapper>
                        <input
                          type='text'
                          className='bg-transparent border-0 text-white text-base ring-0 placeholder:text-gray-350 focus:ring-0 focus:outline-0   w-[60vw]  duration-300'
                          placeholder={t('user.newsFeed.searchBy')!}
                          {...register('search')}
                          id='search'
                        />
                      </NoSSRWrapper>
                    </form>
                  </div>
                  <div className='flex flex-col items-start gap-6 mt-6 ml-[4.625rem]'>
                    <h1 className='text-white text-base leading-9.5'>
                      <span className='opacity-60'>
                        {t('user.newsFeed.enter')}
                      </span>{' '}
                      @{' '}
                      <span className='opacity-60'>
                        {t('user.newsFeed.searchMovies')}
                      </span>
                    </h1>
                    <h1 className='text-white text-base leading-9.5'>
                      <span className='opacity-60'>
                        {t('user.newsFeed.enter')}
                      </span>{' '}
                      #{' '}
                      <span className='opacity-60'>
                        {t('user.newsFeed.searchQuotes')}
                      </span>
                    </h1>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          <Notifications />
          <LanguageSwitcher />
          <button
            className='hidden lg:inline text-white text-sm sm:text-base lg:text-xl lg:leading-9.5 leading-9.5 h-[2.375rem] px-4 lg:px-4 rounded-lg border-2 border-white'
            onClick={logoutUser}
          >
            {t('user.navbar.logout')}
          </button>
        </div>
      </div>
      {isMobileProfileOpen && (
        <div
          ref={ref}
          className='fixed z-[50] h-[41.125rem] pt-[2.8rem] pl-[2.8rem] pr-24 flex flex-col justify-start items-start gap-12 bg-neutral-950 rounded-r-xl left-0 top-0  lg:hidden backdrop-filter backdrop-blur-user-page rotate--180'
        >
          <div className='flex justify-center items-center gap-5'>
            {image && (
              <Image
                src={image}
                alt='profile-photo'
                width={40}
                height={40}
                className={`rounded-full w-10 h-10 ${
                  isProfilePage && 'border-2 border-red-650'
                }`}
              />
            )}
            <div>
              <h1 className='text-white text-xl leading-9.5'>{name}</h1>
              <Link
                href={{ pathname: '/profile' }}
                className='text-gray-350 text-sm leading-9.5'
              >
                {t('user.profileSidebar.edit')}
              </Link>
            </div>
          </div>
          <div className='flex justify-center items-center gap-7'>
            <House isSidebar={false} isNewsFeed={isNewsFeed} />
            <Link
              href={{ pathname: '/news-feed' }}
              className='text-white text-xl leading-9.5 uppercase'
            >
              {t('user.profileSidebar.newsFeed')}
            </Link>
          </div>

          <div className='flex justify-center items-center gap-7'>
            <Camera isSidebar={false} isMoviesPage={isMoviesPage} />
            <Link
              href={{ pathname: '/movies' }}
              className='text-white text-xl leading-9.5 uppercase'
            >
              {t('user.profileSidebar.movies')}
            </Link>
          </div>
          <div
            className='flex justify-center items-center gap-7 cursor-pointer'
            onClick={logoutUser}
          >
            <ArrowRight isLogout={true} />
            <h1 className='text-white text-xl leading-9.5 uppercase'>
              {t('user.navbar.logout')}
            </h1>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserNavbar;
