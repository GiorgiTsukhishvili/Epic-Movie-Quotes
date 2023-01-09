import { Bell, Burger, SearchIcon, useUserNavbar } from 'components';
import { Fragment } from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher';

const UserNavbar = () => {
  const { t, logoutUser, isMobileProfileOpen, setIsMobileProfileOpen } =
    useUserNavbar();

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
          <div className='cursor-pointer inline md:hidden'>
            <SearchIcon />
          </div>
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
        <div className='absolute h-[41.125rem] w-[23.875rem] bg-neutral-950 rounded-r-xl left-0 top-0 inline md:hidden backdrop-filter backdrop-blur-user-page rotate--180'></div>
      )}
    </Fragment>
  );
};

export default UserNavbar;
