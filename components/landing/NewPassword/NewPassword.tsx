import { ErrorMessage } from '@hookform/error-message';
import {
  ArrowRight,
  CloseIcon,
  EyeCrossed,
  EyeRegular,
  GreenCheck,
  RedCircle,
} from 'components';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { NewPasswordProps } from './newPassowrdTypes';
import useNewPassword from './useNewPassword';

const NewPassword: React.FC<NewPasswordProps> = ({ setWhichForm }) => {
  const {
    t,
    register,
    errors,
    password,
    password_confirmation,
    handleSubmit,
    onSubmit,
    passwordsVisible,
    setPasswordsVisible,
    linkValid,
  } = useNewPassword();

  return (
    <Fragment>
      <div className='md:pt-[3.313rem] pt-[4.5rem] text-center fixed md:w-[37.563rem] md:h-[33.375rem] h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]'>
        <h1 className='text-white text-2xl md:text-[2rem] font-medium leading-[120%]'>
          {t('form.passwordReset.header')}
        </h1>
        <h1 className='text-gray-550 mt-3 text-base font-normal leading-[150%] px-[2.125rem] sm:px-[7.5rem]'>
          {t('form.passwordReset.mainText')}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='px-[2.125rem] sm:px-[7.5rem] flex flex-col items-start mt-8'
        >
          <div className='w-full flex flex-col items-start relative'>
            <label
              htmlFor='password'
              className='text-base text-white font-normal leading-[150%] mb-2'
            >
              {t('form.login.password')} <span className='text-red-550'>*</span>
            </label>
            <input
              type={passwordsVisible.password ? 'text' : 'password'}
              {...register('password', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                minLength: {
                  value: 8,
                  message: t('form.register.minLength'),
                },
                maxLength: {
                  value: 15,
                  message: t('form.register.nameMax'),
                },
                validate: {
                  onlyLoweAndNumbers: (value) => {
                    if (!/^[a-z0-9_\-]+$/.test(value)) {
                      return t('form.register.onlyLowerAndNumbers')!;
                    }
                  },
                },
              })}
              className={`focus:shadow-input-custom focus:outline-none w-full border-2 pr-14 rounded-md bg-gray-350 text-gray-550 px-[0.813rem] py-[0.438rem] placeholder-gray-550 ${
                errors.password
                  ? 'border-red-550'
                  : password
                  ? 'border-green-750'
                  : 'border-gray-350'
              }`}
              placeholder={`${t('form.register.passwordInput')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1'>
              <ErrorMessage errors={errors} name='password' />
            </div>

            <div className='absolute top-[2.875rem] h-4 right-[0.85rem] flex items-center justify-end gap-1 w-[2.625rem]'>
              {errors.password ? (
                <RedCircle />
              ) : password ? (
                <GreenCheck />
              ) : (
                <></>
              )}
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

          <div className='w-full flex flex-col items-start relative'>
            <label
              htmlFor='password_confirmation'
              className='text-base text-white font-normal leading-[150%] mb-2'
            >
              {t('form.register.passwordConfirmation')}{' '}
              <span className='text-red-550'>*</span>
            </label>
            <input
              type={
                passwordsVisible.password_confirmation ? 'text' : 'password'
              }
              {...register('password_confirmation', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                validate: {
                  onlyLoweAndNumbers: (value) => {
                    if (password !== value) {
                      return t('form.register.passwordsNoMatch')!;
                    }
                  },
                },
              })}
              className={`focus:shadow-input-custom focus:outline-none w-full border-2 pr-14 rounded-md bg-gray-350 text-gray-550 px-[0.813rem] py-[0.438rem] placeholder-gray-550 ${
                errors.password_confirmation
                  ? 'border-red-550'
                  : password_confirmation
                  ? 'border-green-750'
                  : 'border-gray-350'
              }`}
              placeholder={`${t('form.register.passwordConfirmation')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1'>
              <ErrorMessage errors={errors} name='password_confirmation' />
            </div>

            <div className='absolute top-[2.875rem] h-4 right-[0.85rem] flex items-center justify-end gap-1 w-[2.625rem]'>
              {errors.password_confirmation ? (
                <RedCircle />
              ) : password_confirmation ? (
                <GreenCheck />
              ) : (
                <></>
              )}
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

          <button
            type='submit'
            className='bg-red-650 hover:bg-red-750 text-white text-base  h-[2.375rem]  leading-[150%]  w-full rounded-md '
          >
            {t('form.passwordReset.reset')}
          </button>
        </form>

        {!linkValid && (
          <h1 className='text-red-550 h-5 font-normal text-lg leading-[150%] mt-1'>
            {t('errors.linkNotValid')}
          </h1>
        )}
        <div className='flex w-full items-center justify-center mt-8 '>
          <Link
            className='flex items-center justify-center  gap-3 cursor-pointer'
            onClick={() => setWhichForm('login')}
            href={'/'}
          >
            <ArrowRight />
            <h1 className='text-gray-550 text-base font-normal leading-[150%]'>
              {t('form.forgotPassword.goBack')}
            </h1>
          </Link>
        </div>
      </div>
      <Link
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-blur-sm	'
        href={'/'}
      ></Link>
      <Link
        className='fixed top-5 right-5 md:hidden inline z-30 cursor-pointer'
        href={'/'}
      >
        <CloseIcon />
      </Link>
    </Fragment>
  );
};

export default NewPassword;
