import { useTranslation } from 'next-i18next';

const LandingTop = () => {
  const { t } = useTranslation();

  return (
    <div className='h-[50.5rem] bg-landing-gradient pt-48 md:pt-[21.5rem]'>
      <div className='md:gap-6 gap-8 flex flex-col justify-center items-center'>
        <h1 className='text-2xl md:text-6xl font-bold leading-[150%] text-center text-orange-250 max-w-[17.563rem] md:max-w-[43.938rem]'>
          {t('landing.top.mainText')}
        </h1>
        <button className='bg-red-650 text-white text-base lg:text-xl leading-[150%] py-2 lg:py-2.5 px-7 lg:px-4 rounded-md '>
          {t('landing.top.button')}
        </button>
      </div>
    </div>
  );
};

export default LandingTop;
