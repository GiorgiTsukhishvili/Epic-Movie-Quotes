import { ArrowDown, useLanguageSwitcher } from 'components';
import Link from 'next/link';

const LanguageSwitcher = () => {
  const { t, isDropdownOpen, setIsDropdownOpen, languageRef, pathname, query } =
    useLanguageSwitcher();

  return (
    <div className='relative' ref={languageRef}>
      <div
        className='flex items-center gap-2.5 cursor-pointer'
        onClick={() => setIsDropdownOpen((prevState) => !prevState)}
      >
        <h1 className='text-white text-base font-normal leading-[150%]'>
          {t('navbar.language')}
        </h1>
        <ArrowDown />
      </div>

      {isDropdownOpen && (
        <div className='bg-white px-4 py-2 text-base font-normal leading-[150%] absolute rounded-md top-14 left-[-2rem]'>
          <Link
            href={{ pathname, query }}
            locale='ka'
            className='cursor-pointer text-base font-normal leading-[150%] text-center block'
          >
            ქართული
          </Link>
          <Link
            href={{ pathname, query }}
            locale='en'
            className='cursor-pointer text-base font-normal leading-[150%] text-center block'
          >
            English
          </Link>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
