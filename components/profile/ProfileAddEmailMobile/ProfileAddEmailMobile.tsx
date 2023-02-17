import { Fragment } from 'react';
import { useProfileAddEmailMobile } from 'components';
import { ErrorMessage } from '@hookform/error-message';
import { ProfileAddEmailMobileProps } from './profileAddEmailMobileTypes';

const ProfileAddEmailMobile: React.FC<ProfileAddEmailMobileProps> = ({
  cancel,
  registerMobile,
  errorsMobile,
  setEmailStep,
  getValuesMobile,
  setErrorMobile,
  emails,
}) => {
  const { t, checkEmailValidation } = useProfileAddEmailMobile(
    getValuesMobile,
    setErrorMobile,
    emails
  );

  return (
    <Fragment>
      <div className=' w-full min-h-[10.75rem] items-start flex-col relative justify-start flex'>
        <div className='bg-zinc-750 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />
        <div className='z-10 block  px-8 mx-auto'>
          <h1 className='py-8 text-white leading-9.5 text-base'>
            {t('user.profile.enterNewName')}
          </h1>
          <input
            type='text'
            className='w-full sm:w-[35rem]  mt-2  bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl '
            {...registerMobile('email')}
            placeholder={t('user.profile.enterNewName')}
          />
          <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1 '>
            <ErrorMessage errors={errorsMobile} name='email' />
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between gap-8 mt-24 px-7'>
        <button
          className='text-gray-350 text-xl leading-9.5'
          onClick={() => cancel()}
        >
          {t('user.profile.cancel')}
        </button>
        <button
          className='text-white leading-9.5 px-4 py-2 text-xl bg-red-650 rounded'
          onClick={() => {
            checkEmailValidation() && setEmailStep('third');
          }}
        >
          {t('user.profile.add')}
        </button>
      </div>
    </Fragment>
  );
};

export default ProfileAddEmailMobile;
