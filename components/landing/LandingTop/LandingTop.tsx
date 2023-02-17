import { useTranslation } from 'next-i18next';
import { LandingTopProps } from './landingTopTypes';

const LandingTop: React.FC<LandingTopProps> = ({ setWhichForm }) => {
  const { t } = useTranslation();

  return (
    <div className='h-[50.5rem] bg-landing-gradient relative overflow-x-hidden'>
      <div className='bg-landing-top-gradient absolute w-screen top-0 h-[50.5rem]' />
      <div className='md:gap-6 gap-8 flex flex-col justify-center top-1/2 translate-y-[-50%] items-center z-[9] absolute w-full'>
        <h1 className='text-2xl md:text-6xl font-bold text-center text-orange-250 max-w-[17.563rem] md:max-w-[43.938rem]  leading-9.5   md:leading-9.5 '>
          {t('landing.top.mainText')}
        </h1>
        <button
          onClick={() => setWhichForm('registration')}
          className='bg-red-650 hover:bg-red-750 text-white text-base lg:text-xl leading-9.5 py-2 lg:py-2.5 px-7 lg:px-4 rounded '
        >
          {t('landing.top.button')}
        </button>
      </div>
    </div>
  );
};

export default LandingTop;
