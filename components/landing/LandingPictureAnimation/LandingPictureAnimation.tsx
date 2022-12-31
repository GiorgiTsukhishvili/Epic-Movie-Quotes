import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';

const LandingPictureAnimation = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className='h-screen relative overflow-x-hidden'>
        <div className='w-full h-full bg-interstellar-gradient absolute z-[2] rotate--90 translate-y-[-0.2rem]' />
        <div className='w-screen h-screen bg-interstellar absolute bg-no-repeat bg-center bg-cover bg-fixed' />
        <div className='z-[3] absolute flex gap-4 top-[18rem] md:top-[25.813rem] left-[2.188rem] md:left-[10.625rem]'>
          <div className='w-[1.063rem] md:w-[3.313rem] h-0.5 bg-white mt-[0.938rem] md:mt-[2.563rem]' />
          <div>
            <h1 className='font-bold max-w-[47.563rem] text-white leading-[150%] md:leading-[150%] text-xl md:text-5xl'>
              {t('landing.interstellar.text')}
            </h1>
            <h1 className='font-bold text-zinc-350 leading-[150%] text-base md:text-3xl'>
              {t('landing.interstellar.name')}
            </h1>
          </div>
        </div>
      </div>
      <div className='h-screen relative overflow-x-hidden'>
        <div className='w-full h-full bg-the-royal-tenenbaums-gradient absolute z-[2] ' />
        <div className='w-screen h-screen bg-the-royal-tenenbaums absolute bg-no-repeat bg-center bg-cover bg-fixed' />
        <div className='z-[2] absolute  flex gap-4 top-[18rem] md:top-[25.813rem] left-[2.188rem] md:left-[10.625rem]'>
          <div className='w-[1.063rem] md:w-[3.313rem] h-0.5 bg-white mt-[0.938rem] md:mt-[2.563rem]' />
          <div>
            <h1 className='font-bold max-w-[47.563rem] text-white leading-[150%] md:leading-[150%] text-xl md:text-5xl'>
              {t('landing.the-royal-tenenbaums.text')}
            </h1>
            <h1 className='font-bold text-zinc-350 leading-[150%] text-base md:text-3xl'>
              {t('landing.the-royal-tenenbaums.name')}
            </h1>
          </div>
        </div>
      </div>
      <div className='h-screen relative overflow-x-hidden'>
        <div className='w-full h-full bg-lord-of-the-rings-gradient absolute z-[2]' />
        <div className='w-screen h-screen bg-lord-of-the-rings absolute bg-no-repeat bg-center bg-cover bg-fixed' />
        <div className='z-[2] absolute max-w-[47.563rem] flex gap-4  top-[18rem] md:top-[25.813rem] left-[2.188rem] md:left-[10.625rem]'>
          <div className='w-[1.063rem] md:w-[3.313rem] h-0.5 bg-white mt-[0.938rem] md:mt-[2.563rem]' />
          <div>
            <h1 className='font-bold max-w-[47.563rem] text-white leading-[150%] md:leading-[150%] text-xl md:text-5xl'>
              {t('landing.lord-of-the-rings.text')}
            </h1>
            <h1 className='font-bold text-zinc-350 leading-[150%] text-base md:text-3xl'>
              {t('landing.lord-of-the-rings.name')}
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPictureAnimation;
