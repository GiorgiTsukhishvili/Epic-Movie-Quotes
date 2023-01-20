import { Bell, useNotifications } from 'components';
import { Fragment } from 'react';

const Notifications = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, t, ref } =
    useNotifications();

  return (
    <div ref={ref}>
      <div
        className='relative cursor-pointer'
        onClick={() => setIsNotificationsOpen((prevState) => !prevState)}
      >
        <Bell />
        <div className='bg-red-850 w-[1.563rem] h-[1.563rem] rounded-full flex justify-center items-center absolute top-[-0.5rem] left-[0.85rem]'>
          <span className='text-white leading-[150%] font-medium'>3</span>
        </div>
      </div>

      {isNotificationsOpen && (
        <Fragment>
          <div className='border-b-black border-b-[2rem] border-l-[1rem] border-r-[1rem] border-l-transparent border-r-transparent absolute top-[4.5rem] right-[7.8rem] lg:right-[18.5rem]' />
          <div className='bg-black lg:w-[60rem] lg:h-[50.75rem] w-screen h-screen absolute top-[6rem] left-0 lg:left-auto  lg:right-[5rem] rounded-xl'>
            <div className='flex justify-between items-center px-8 lg:pt-10 pt-5'>
              <h1 className='md:text-[2rem] text-xl text-white font-medium leading-[150%]'>
                {t('user.navbar.notifications')}
              </h1>
              <h1 className='md:text-xl text-sm text-white font-medium leading-[150%] underline cursor-pointer'>
                {t('user.navbar.mark')}
              </h1>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Notifications;
