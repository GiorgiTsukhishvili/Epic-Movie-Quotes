import { Camera, House } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { SideNavbarProps } from './sideNavbarTypes';
import useSideNavbar from './useSideNavbar';

const SideNavbar: React.FC<SideNavbarProps> = ({
  isMoviesPage,
  isNewsFeed,
  isProfilePage,
}) => {
  const { t, name, image } = useSideNavbar();

  return (
    <div className='pt-8 pl-[4.375rem] flex-col justify-start items-start gap-11 hidden lg:flex fixed top-[5.375rem]'>
      <div className='flex justify-center items-center gap-5'>
        {image && (
          <Image
            src={image}
            alt='profile-photo'
            width={60}
            height={60}
            priority
            className={`rounded-full w-[3.75rem] h-[3.75rem] ${
              isProfilePage && 'border-2 border-red-650'
            }`}
          />
        )}
        <div>
          <h1 className='text-white text-2xl leading-[150%] uppercase'>
            {name}
          </h1>
          <Link
            href={{ pathname: '/profile' }}
            className='text-gray-350 text-base leading-[150%]'
          >
            {t('user.profileSidebar.edit')}
          </Link>
        </div>
      </div>

      <Link
        href={{ pathname: '/news-feed' }}
        className='text-white text-2xl leading-[150%] flex justify-center items-center gap-11'
      >
        <House isSidebar={true} isNewsFeed={isNewsFeed} />
        {t('user.profileSidebar.newsFeed')}
      </Link>

      <Link
        href={{ pathname: '/movies' }}
        className='text-white text-2xl leading-[150%] flex justify-center items-center gap-11'
      >
        <Camera isSidebar={true} isMoviesPage={isMoviesPage} />
        {t('user.profileSidebar.movies')}
      </Link>
    </div>
  );
};

export default SideNavbar;
