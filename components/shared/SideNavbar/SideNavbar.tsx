import { Camera, House } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import useSideNavbar from './useSideNavbar';

const SideNavbar = () => {
  const { t, name, image } = useSideNavbar();

  return (
    <div className='pt-8 pl-[4.375rem] flex-col justify-start items-start gap-11 hidden md:flex'>
      <div className='flex justify-center items-center gap-5'>
        {image && (
          <Image
            src={image}
            alt='profile-photo'
            width={60}
            height={60}
            priority
          />
        )}
        <div>
          <h1 className='text-white text-2xl leading-[150%] uppercase'>
            {name}
          </h1>
          <Link href={'/'} className='text-gray-350 text-base leading-[150%]'>
            {t('user.profileSidebar.edit')}
          </Link>
        </div>
      </div>
      <div className='flex justify-center items-center gap-11'>
        <House isSidebar={true} />
        <Link
          href={'/'}
          className='text-white text-2xl leading-[150%] uppercase'
        >
          {t('user.profileSidebar.newsFeed')}
        </Link>
      </div>

      <div className='flex justify-center items-center gap-11'>
        <Camera isSidebar={true} />
        <Link
          href={'/movies'}
          className='text-white text-2xl leading-[150%] uppercase'
        >
          {t('user.profileSidebar.movies')}
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;
