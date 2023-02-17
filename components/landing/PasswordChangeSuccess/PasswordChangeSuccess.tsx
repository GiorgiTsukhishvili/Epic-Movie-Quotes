import { CheckCircle } from 'components/icons';
import Link from 'next/link';
import { Fragment } from 'react';
import { PasswordSuccessMessageProps } from './passwordChangeSuccessTypes';
import usePasswordChangeSuccess from './usePasswordChangeSuccess';

const PasswordChangeSuccess: React.FC<PasswordSuccessMessageProps> = ({
  setWhichForm,
}) => {
  const { t } = usePasswordChangeSuccess();

  return (
    <Fragment>
      <Link
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-filter backdrop-blur-main-page'
        onClick={() => setWhichForm('')}
        href={'/'}
      ></Link>

      <div className='md:pt-[4.5rem] pt-[4.5rem] flex justify-center text-center fixed md:w-[33.625rem] md:h-[23.45rem] h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]'>
        <div className='relative mx-[2.125rem] md:mx-0 flex flex-col items-center md:pt-0 pt-[4.375rem] rounded-[0.625rem] md:h-full mt-[3.875rem] md:mt-0 md:w-full w-[22.5rem] h-[24.25rem] '>
          <div className='md:hidden w-full h-full bg-email-sent opacity-30 absolute top-0 rounded-[0.625rem] rotate-180 pointer-events-none' />
          <CheckCircle />
          <h1 className='font-medium text-2xl md:text-[2rem] text-white leading-[120%] mt-[2.5rem] md:mt-5'>
            {t('form.successMessage.headerTwo')}
          </h1>
          <h1 className='font-normal text-base text-white mt-8 md:mt-8 leading-9.5 px-4 '>
            {t('form.successMessage.mainTwo')}
          </h1>
          <Link
            href='/'
            className=' w-full bg-red-650 hover:bg-red-750 py-[0.438rem] md:w-[22.5rem] text-white leading-9.5 text-base mt-8 md:mt-10 rounded-md'
            onClick={() => setWhichForm('login')}
          >
            {t('form.successMessage.button')}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default PasswordChangeSuccess;
