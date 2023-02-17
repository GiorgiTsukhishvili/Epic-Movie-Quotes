import { ErrorMessage } from '@hookform/error-message';
import { EyeCrossed, EyeRegular } from 'components/icons';
import { Fragment } from 'react';
import { ProfilePasswordMobileProps } from './profilePasswordMobileTypes';
import { useProfilePasswordMobile } from 'components';

const ProfilePasswordMobile: React.FC<ProfilePasswordMobileProps> = ({
  registerMobile,
  setPasswordEditStep,
  errorsMobile,
  cancel,
  password,
  password_confirmation,
  setErrorMobile,
}) => {
  const { t, passwordsVisible, setPasswordsVisible, checkPasswordValidations } =
    useProfilePasswordMobile(password, password_confirmation, setErrorMobile);

  return (
    <Fragment>
      <div className=' w-full min-h-[10.75rem] items-start flex-col relative justify-start flex'>
        <div className='bg-zinc-750 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />
        <div className='z-10 block  px-8 mx-auto'>
          <div className='h-[8.375rem] w-full sm:w-[35rem] bg-neutral-950 mb-8  border border-profile-border mt-[2.375rem] rounded-md p-6'>
            <h1 className='text-white text-base leading-9.5'>
              {t('user.profile.shouldContain')}
            </h1>
            <h1 className='text-neutral-450 text-sm leading-9.5 mt-4 flex items-center gap-1.5'>
              <span className='w-1 h-1 rounded-full bg-neutral-450 inline-block' />
              {t('user.profile.min')}
            </h1>
            <h1 className='text-white text-sm leading-9.5 flex items-center gap-1.5'>
              <span className='w-1 h-1 rounded-full bg-green-750 inline-block' />
              {t('user.profile.max')}
            </h1>
          </div>
          <div className='flex flex-col items-start relative mt-10 w-full sm:w-[35rem] '>
            <label
              htmlFor='password'
              className='text-base text-white font-normal leading-9.5'
            >
              {t('user.profile.newPassword')}
            </label>
            <input
              type={passwordsVisible.password ? 'text' : 'password'}
              {...registerMobile('password', {
                minLength: {
                  value: 8,
                  message: t('form.register.minLength'),
                },
                maxLength: {
                  value: 15,
                  message: t('form.register.nameMax'),
                },
                validate: {
                  onlyLoweAndNumbers: (value: string) => {
                    if (!/^[a-z0-9_\-]+$/.test(value)) {
                      return t('form.register.onlyLowerAndNumbers')!;
                    }
                  },
                },
              })}
              className='w-full sm:w-[35rem]  mt-2  bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl pr-10'
              placeholder={`${t('form.register.passwordInput')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1'>
              <ErrorMessage errors={errorsMobile} name='password' />
            </div>

            <div className='absolute top-[3rem] h-4 right-[0.85rem] flex items-center justify-end gap-1 w-[2.625rem]'>
              {passwordsVisible.password ? (
                <span
                  onClick={() =>
                    setPasswordsVisible((prevVisible) => {
                      return {
                        ...prevVisible,
                        password: !prevVisible.password,
                      };
                    })
                  }
                  className='cursor-pointer'
                >
                  <EyeRegular />
                </span>
              ) : (
                <span
                  onClick={() =>
                    setPasswordsVisible((prevVisible) => {
                      return {
                        ...prevVisible,
                        password: !prevVisible.password,
                      };
                    })
                  }
                  className='cursor-pointer'
                >
                  <EyeCrossed />
                </span>
              )}
            </div>
          </div>

          <div className='flex flex-col items-start relative mt-4 w-full sm:w-[35rem]'>
            <label
              htmlFor='password_confirmation'
              className='text-base text-white font-normal leading-9.5 mb-2'
            >
              {t('form.register.passwordConfirmation')}
            </label>
            <input
              type={
                passwordsVisible.password_confirmation ? 'text' : 'password'
              }
              {...registerMobile('password_confirmation', {
                validate: {
                  onlyLoweAndNumbers: (value: string) => {
                    if (password !== value) {
                      return t('form.register.passwordsNoMatch')!;
                    }
                  },
                },
              })}
              className='w-full sm:w-[35rem]  mt-2  bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl pr-10'
              placeholder={`${t('form.register.passwordConfirmation')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1'>
              <ErrorMessage
                errors={errorsMobile}
                name='password_confirmation'
              />
            </div>

            <div className='absolute top-[3.5rem] h-4 right-[0.85rem] flex items-center justify-end gap-1 w-[2.625rem]'>
              {passwordsVisible.password_confirmation ? (
                <span
                  onClick={() =>
                    setPasswordsVisible((prevVisible) => {
                      return {
                        ...prevVisible,
                        password_confirmation:
                          !prevVisible.password_confirmation,
                      };
                    })
                  }
                  className='cursor-pointer'
                >
                  <EyeRegular />
                </span>
              ) : (
                <span
                  onClick={() =>
                    setPasswordsVisible((prevVisible) => {
                      return {
                        ...prevVisible,
                        password_confirmation:
                          !prevVisible.password_confirmation,
                      };
                    })
                  }
                  className='cursor-pointer'
                >
                  <EyeCrossed />
                </span>
              )}
            </div>
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
            checkPasswordValidations() && setPasswordEditStep('second');
          }}
        >
          {t('user.profile.add')}
        </button>
      </div>
    </Fragment>
  );
};

export default ProfilePasswordMobile;
