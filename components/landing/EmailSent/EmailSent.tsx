import { Airplane, CloseIcon, useEmailSent } from 'components';
import { Fragment } from 'react';
import { EmailSentProps } from './emailSentTypes';

const EmailSent: React.FC<EmailSentProps> = ({
  setWhichForm,
  header,
  main,
  goToEmail,
  skip,
}) => {
  const { t } = useEmailSent();

  return (
    <Fragment>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-blur-sm	'
        onClick={() => setWhichForm('')}
      />

      <div
        className={`md:pt-[4.5rem] pt-[4.5rem] flex justify-center text-center fixed md:w-[33.625rem] ${
          skip ? 'md:h-[28rem]' : 'md:h-[25.875rem]'
        } h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]`}
      >
        <div className='relative mx-[2.125rem] md:mx-0 flex flex-col items-center md:pt-0 pt-[4.5rem] rounded-[0.625rem] md:h-full mt-[3.875rem] md:mt-0 md:w-full w-[22.5rem] h-[25.875rem] '>
          <div className='md:hidden w-full h-full bg-email-sent opacity-30 absolute top-0 rounded-[0.625rem] rotate-180 pointer-events-none' />
          <Airplane />
          <h1 className='font-medium text-2xl md:text-[2rem] text-white leading-[120%] mt-4 md:mt-5'>
            {t(header)}
          </h1>
          <h1 className='font-normal text-base text-white mt-6 md:mt-8 leading-[150%] px-4 '>
            {t(main)}
          </h1>
          <a
            href='https://gmail.com'
            target={'_blank'}
            rel={'noreferrer'}
            className={`${
              skip ? 'w-full' : 'w-[11.875rem]'
            } bg-red-650 hover:bg-red-750 py-[0.438rem] md:w-[22.5rem] text-white leading-[150%] text-base mt-6 md:mt-10 rounded-md`}
          >
            {t(goToEmail)}
          </a>
          {skip && (
            <h1
              className='mt-8 text-gray-550 text-base font-normal leading-[150%] cursor-pointer'
              onClick={() => setWhichForm('')}
            >
              {t(skip)}
            </h1>
          )}
        </div>
      </div>
      <div
        className='fixed top-5 right-5 md:hidden inline z-30 cursor-pointer'
        onClick={() => setWhichForm('')}
      >
        <CloseIcon />
      </div>
    </Fragment>
  );
};

export default EmailSent;
