import {
  Bell,
  Burger,
  Camera,
  House,
  SearchIcon,
  useUserNavbar,
} from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { UserNavbarTypes } from './userNavbarTypes';

const UserNavbar: React.FC<UserNavbarTypes> = ({ isNewsFeed }) => {
  const {
    t,
    logoutUser,
    isMobileProfileOpen,
    setIsMobileProfileOpen,
    name,
    image,
    ref,
  } = useUserNavbar();

  return (
    <Fragment>
      <div className='bg-white rotate--180 h-[5.375rem] flex justify-between items-center px-9 md:px-[4.375rem] py-8 backdrop-filter backdrop-blur-user-page bg-opacity-5'>
        <h1 className='uppercase text-orange-250 font-medium leading-[150%] hidden md:inline'>
          movie quotes
        </h1>

        <button
          className='inline md:hidden cursor-pointer'
          onClick={() => setIsMobileProfileOpen(true)}
        >
          <Burger />
        </button>

        <div className='flex justify-center items-center gap-10'>
          {isNewsFeed && (
            <div className='cursor-pointer inline md:hidden'>
              <SearchIcon />
            </div>
          )}
          <div className='relative cursor-pointer'>
            <Bell />
            <div className='bg-red-850 w-[1.563rem] h-[1.563rem] rounded-full flex justify-center items-center absolute top-[-0.5rem] left-[0.85rem]'>
              <span className='text-white leading-[150%] font-medium'>3</span>
            </div>
          </div>
          <LanguageSwitcher />
          <button
            className='hidden md:inline text-white text-sm sm:text-base lg:text-xl md:leading-[150%] leading-[150%] h-[2.375rem] px-4 lg:px-4 rounded-md border-2 border-white'
            onClick={logoutUser}
          >
            {t('user.navbar.logout')}
          </button>
        </div>
      </div>
      {isMobileProfileOpen && (
        <div
          ref={ref}
          className='absolute h-[41.125rem] pt-[2.8rem] pl-[2.8rem] pr-24 flex flex-col justify-start items-start gap-12 bg-neutral-950 rounded-r-xl left-0 top-0  md:hidden backdrop-filter backdrop-blur-user-page rotate--180'
        >
          <div className='flex justify-center items-center gap-5'>
            {image && (
              <Image src={image} alt='profile-photo' width={40} height={40} />
            )}
            <div>
              <h1 className='text-white text-xl leading-[150%] uppercase'>
                {name}
              </h1>
              <Link href={'/'} className='text-gray-350 text-sm leading-[150%]'>
                {t('user.profileSidebar.edit')}
              </Link>
            </div>
          </div>
          <div className='flex justify-center items-center gap-7'>
            <House isSidebar={false} />
            <Link
              href={'/'}
              className='text-white text-xl leading-[150%] uppercase'
            >
              {t('user.profileSidebar.newsFeed')}
            </Link>
          </div>

          <div className='flex justify-center items-center gap-7'>
            <Camera isSidebar={false} />
            <Link
              href={'/movies'}
              className='text-white text-xl leading-[150%] uppercase'
            >
              {t('user.profileSidebar.movies')}
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserNavbar;
