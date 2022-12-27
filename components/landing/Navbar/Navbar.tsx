import { LanguageSwitcher } from 'components';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-20 fixed top-0 z-10 px-[4.375rem] py-8 flex items-center justify-between'>
      <h1 className='uppercase text-orange-250 font-medium text-base leading-[150%]'>
        Movie Quotes
      </h1>
      <div className='flex gap-4 items-center'>
        <LanguageSwitcher />
        <button className='bg-red-650 text-white text-base md:inline hidden lg:text-xl leading-[150%] py-2 lg:py-2.5 px-7 lg:px-4 rounded-md '>
          {t('navbar.singUp')}
        </button>
        <button className='text-white text-base lg:text-xl leading-[150%] py-2 lg:py-2.5 px-7 lg:px-4 rounded-md border-2 border-white'>
          {t('navbar.login')}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
