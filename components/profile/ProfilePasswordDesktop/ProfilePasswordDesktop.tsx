import { Fragment } from 'react';
import { EyeCrossed, EyeRegular, useProfilePasswordDesktop } from 'components';
import { ProfilePasswordDesktopProps } from './profilePasswordDesktopTypes';
import { ErrorMessage } from '@hookform/error-message';

const ProfilePasswordDesktop: React.FC<ProfilePasswordDesktopProps> = ({
  setIsPasswordEditOpen,
  isPasswordEditOpen,
  register,
  errors,
  password,
}) => {
  const { t, passwordsVisible, setPasswordsVisible } =
    useProfilePasswordDesktop();

  return (
    <Fragment>
      <label
        htmlFor='name'
        className='text-medium text-white leading-9.5 block mt-10 '
      >
        {t('user.profile.password')}
      </label>

      <div className='flex items-center'>
        <input
          type='password'
          className='w-[27rem] pointer-events-none  mt-2 inline xl:w-[33rem]  bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl'
          defaultValue={'************'}
        />
        <h1
          className={`text-gray-350 leading-9.5 text-xl inline ml-8 cursor-pointer ${
            isPasswordEditOpen ? 'opacity-0' : 'opacity-1'
          }`}
          onClick={() => setIsPasswordEditOpen(true)}
        >
          {t('user.profile.edit')}
        </h1>
      </div>

      {isPasswordEditOpen ? (
        <Fragment>
          <div className='h-[8.375rem] w-[27rem] xl:w-[33rem] border border-profile-border mt-[2.375rem] rounded-md p-6'>
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

          <div className='flex flex-col items-start relative mt-10 w-[27rem] xl:w-[33rem]'>
            <label
              htmlFor='password'
              className='text-base text-white font-normal leading-9.5'
            >
              {t('user.profile.newPassword')}
            </label>
            <input
              type={passwordsVisible.password ? 'text' : 'password'}
              {...register('password', {
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
              className='w-[27rem] mt-2 inline xl:w-[33rem]  bg-gray-350 rounded-md py-2 px-4 placeholder:text-neutral-750 text-neutral-750 text-2xl'
              placeholder={`${t('form.register.passwordInput')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1'>
              <ErrorMessage errors={errors} name='password' />
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

          <div className='flex flex-col items-start relative mt-4 w-[27rem] xl:w-[33rem]'>
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
              {...register('password_confirmation', {
                validate: {
                  onlyLoweAndNumbers: (value: string) => {
                    if (password !== value) {
                      return t('form.register.passwordsNoMatch')!;
                    }
                  },
                },
              })}
              className='w-[27rem] mt-2 inline xl:w-[33rem]  bg-gray-350 rounded-md py-2 px-4 placeholder:text-neutral-750 text-neutral-750 text-2xl'
              placeholder={`${t('form.register.passwordConfirmation')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1'>
              <ErrorMessage errors={errors} name='password_confirmation' />
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
        </Fragment>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default ProfilePasswordDesktop;
