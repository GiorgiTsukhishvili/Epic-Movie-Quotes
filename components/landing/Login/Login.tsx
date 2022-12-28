import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginProps } from './loginTypes';

const Login: React.FC<LoginProps> = ({ setWhichForm }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className='md:pt-[3.313rem] pt-[4.5rem] text-center fixed md:w-[37.563rem] md:h-[35.125rem] h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]'>
        <h1 className='text-white text-2xl md:text-[2rem] font-medium leading-[120%]'>
          {t('form.login.header')}
        </h1>
        <h1 className='text-gray-550 mt-3 text-base font-normal leading-[150%]'>
          {t('form.login.welcomeBack')}
        </h1>
      </div>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-blur-sm	'
        onClick={() => setWhichForm('')}
      />
    </Fragment>
  );
};

export default Login;
