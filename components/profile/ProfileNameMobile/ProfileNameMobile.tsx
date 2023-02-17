import { ErrorMessage } from '@hookform/error-message';
import { Fragment } from 'react';
import { useProfileNameMobile } from 'components';
import { ProfileNameMobileProps } from './profileNameMobileTypes';

const ProfileNameMobile: React.FC<ProfileNameMobileProps> = ({
  registerMobile,
  setNameEditStep,
  errorsMobile,
  cancel,
}) => {
  const { t } = useProfileNameMobile();

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
            {...registerMobile('name', {
              minLength: {
                value: 3,
                message: t('form.login.minLength'),
              },
              validate: {
                onlyLoweAndNumbers: (value: string) => {
                  if (!/^[a-z0-9_\-]+$/.test(value)) {
                    return t('form.register.onlyLowerAndNumbers')!;
                  }
                },
              },
            })}
          />
          <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1 '>
            <ErrorMessage errors={errorsMobile} name='name' />
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
            !errorsMobile.name && setNameEditStep('second');
          }}
        >
          {t('user.profile.add')}
        </button>
      </div>
    </Fragment>
  );
};

export default ProfileNameMobile;
