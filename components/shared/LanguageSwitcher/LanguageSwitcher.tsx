import { ArrowDown, useLanguageSwitcher } from 'components';

const LanguageSwitcher = () => {
  const { t, isDropdownOpen, setIsDropdownOpen, changeLanguage, ref } =
    useLanguageSwitcher();

  return (
    <div className='relative' ref={ref}>
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
          <h1
            className='cursor-pointer text-base font-normal leading-[150%] text-center'
            onClick={() => changeLanguage('ka')}
          >
            ქართული
          </h1>
          <h1
            className='cursor-pointer text-base font-normal leading-[150%] text-center'
            onClick={() => changeLanguage('en')}
          >
            English
          </h1>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
