import { Bell, useNotifications, Comment, LikeFilled } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

const Notifications = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    t,
    ref,
    notifications,
    calculateData,
    calculateNewNotifications,
    mutate,
    updateAllNotifications,
  } = useNotifications();

  return (
    <div ref={ref}>
      <div
        className='relative cursor-pointer'
        onClick={() => setIsNotificationsOpen((prevState) => !prevState)}
      >
        <Bell />
        {calculateNewNotifications() > 0 && (
          <div className='bg-red-850 w-[1.563rem] h-[1.563rem] rounded-full flex justify-center items-center absolute top-[-0.5rem] left-[0.85rem]'>
            <span className='text-white leading-9.5 font-medium'>
              {calculateNewNotifications()}
            </span>
          </div>
        )}
      </div>

      {isNotificationsOpen && (
        <Fragment>
          <div className='border-b-black border-b-[2rem]  border-l-[1rem] border-r-[1rem] border-l-transparent border-r-transparent absolute top-[4.5rem] right-[7.8rem] lg:right-[19.2rem]' />
          <div className='bg-black lg:w-[60rem] overflow-auto pb-24 lg:pb-0 lg:h-[50.75rem] w-screen h-screen absolute top-[5.5rem] lg:top-[6rem] left-0 lg:left-auto  lg:right-[5rem] rounded-xl'>
            <div className='flex justify-between items-center px-8 lg:pt-10 pt-5 mb-8'>
              <h1 className='md:text-[2rem] text-xl text-white font-medium leading-9.5'>
                {t('user.navbar.notifications')}
              </h1>
              <h1
                className='md:text-xl text-sm text-white font-medium leading-9.5 underline cursor-pointer'
                onClick={updateAllNotifications}
              >
                {t('user.navbar.mark')}
              </h1>
            </div>

            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href={`/movies/${notification.quote.movie_id}?mode=view&quote-id=${notification.quote_id}`}
                className='lg:px-6 lg:py-5 p-4 border border-border-transparent mx-8 mb-4 rounded-md flex lg:justify-between lg:flex-row flex-col'
                onClick={() => mutate([notification.id])}
              >
                <div className='flex gap-3 lg:gap-6'>
                  <Image
                    src={notification.person.image}
                    alt='commenter-image'
                    width={80}
                    height={80}
                    className={`lg:w-20 lg:h-20 w-[3.75rem] h-[3.75rem] rounded-full ${
                      notification.is_new && 'border-2 border-green-750'
                    }`}
                  />
                  <div>
                    <h1 className='text-xl leading-9.5 text-white mb-1'>
                      {notification.person.name}
                    </h1>
                    {notification.is_comment ? (
                      <h1 className='lg:text-xl text-base leading-9.5 text-gray-350 flex gap-3'>
                        <Comment />
                        {t('user.navbar.commented')}
                      </h1>
                    ) : (
                      <h1 className='lg:text-xl text-base  leading-9.5 text-gray-350 flex gap-3'>
                        <LikeFilled />
                        {t('user.navbar.reacted')}
                      </h1>
                    )}
                  </div>
                </div>
                <div className='flex lg:flex-col lg:items-end items-center flex-row-reverse justify-end mt-2 lg:mt-0 gap-6 lg:gap-0'>
                  <h1 className='text-zinc-350 text-base lg:text-xl leading-9.5'>
                    {calculateData(notification.created_at)}
                  </h1>
                  {notification.is_new ? (
                    <h1 className='text-green-750 text-base lg:text-xl leading-9.5 lg:mt-2'>
                      {t('user.navbar.new')}
                    </h1>
                  ) : (
                    <h1 className='text-green-750 text-base lg:text-xl leading-9.5 lg:mt-2 opacity-0'>
                      {t('user.navbar.new')}
                    </h1>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Notifications;
