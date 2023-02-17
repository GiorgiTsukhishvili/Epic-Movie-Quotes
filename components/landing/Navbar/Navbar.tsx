import { LanguageSwitcher } from 'components';
import { NavbarProps } from './navbarTypes';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Navbar: React.FC<NavbarProps> = ({ setWhichForm }) => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-20 fixed top-0 z-10 px-[1rem] sm:px-[2.5rem] md:px-[4.375rem] py-8 flex items-center justify-between'>
      <Link
        href={'/'}
        className='uppercase text-orange-250 font-medium text-sm sm:text-base leading-9.5'
      >
        Movie Quotes
      </Link>
      <div className='flex gap-4 items-center'>
        <LanguageSwitcher />
        <button
          onClick={() => setWhichForm('registration')}
          className='bg-red-650 hover:bg-red-750 text-white text-base md:inline hidden lg:text-xl md:leading-9.5 leading-9.5 h-[2.375rem] px-7 lg:px-6 rounded '
        >
          {t('navbar.singUp')}
        </button>
        <button
          className='text-white text-sm sm:text-base lg:text-xl md:leading-9.5 leading-9.5 h-[2.375rem] px-4 lg:px-6 rounded border-2 border-white'
          onClick={() => setWhichForm('login')}
        >
          {t('navbar.login')}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
