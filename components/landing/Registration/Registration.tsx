import React, { Fragment } from 'react';
import { RegistrationProps } from './registrationTypes';
import {
  CloseIcon,
  EyeCrossed,
  EyeRegular,
  Google,
  GreenCheck,
  RedCircle,
  useRegistration,
} from 'components';
import { ErrorMessage } from '@hookform/error-message';

const Registration: React.FC<RegistrationProps> = ({ setWhichForm }) => {
  const {
    t,
    errors,
    handleSubmit,
    onSubmit,
    register,
    name,
    email,
    password,
    password_confirmation,
    passwordsVisible,
    setPasswordsVisible,
  } = useRegistration();

  return (
    <Fragment>
      <div className='md:pt-[3.313rem] pt-[4.5rem] text-center fixed md:w-[37.563rem] md:h-[46rem] h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]'>
        <h1 className='text-white text-2xl md:text-[2rem] font-medium leading-[120%]'>
          {t('form.register.header')}
        </h1>
        <h1 className='text-gray-550 mt-3 text-base font-normal leading-[150%] px-[2.125rem] sm:px-[7.5rem]'>
          {t('form.register.mainText')}
        </h1>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data, setWhichForm))}
          className='px-[2.125rem] sm:px-[7.5rem] flex flex-col items-start mt-8'
        >
          <div className='w-full flex flex-col items-start relative'>
            <label
              htmlFor='name'
              className='text-base text-white font-normal leading-[150%] mb-2'
            >
              {t('form.register.name')} <span className='text-red-550'>*</span>
            </label>
            <input
              type='text'
              {...register('name', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                minLength: {
                  value: 3,
                  message: t('form.login.minLength'),
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
              className={`${
                errors.name
                  ? 'border-red-550'
                  : name
                  ? 'border-green-750'
                  : 'border-gray-350'
              } focus:shadow-input-custom focus:outline-none w-full border-2 pr-10 rounded-md bg-gray-350 text-gray-550 px-[0.813rem] py-[0.438rem] placeholder-gray-550`}
              placeholder={`${t('form.register.nameInput')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1'>
              <ErrorMessage errors={errors} name='name' />
            </div>
            <div className='absolute top-[2.875rem] right-[0.85rem]'>
              {errors.name ? <RedCircle /> : name ? <GreenCheck /> : <></>}
            </div>
          </div>

          <div className='w-full flex flex-col items-start relative'>
            <label
              htmlFor='email'
              className='text-base text-white font-normal leading-[150%] mb-2'
            >
              {t('form.login.email')} <span className='text-red-550'>*</span>
            </label>
            <input
              type='text'
              {...register('email', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                validate: {
                  isEmail: (value) => {
                    if (
                      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                      )
                    ) {
                      return t('form.forgotPassword.inputEmail')!;
                    }
                  },
                },
              })}
              className={`${
                errors.email
                  ? 'border-red-550'
                  : email
                  ? 'border-green-750'
                  : 'border-gray-350'
              } focus:shadow-input-custom focus:outline-none w-full border-2 pr-10 rounded-md bg-gray-350 text-gray-550 px-[0.813rem] py-[0.438rem] placeholder-gray-550`}
              placeholder={`${t('form.login.emailInput')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1'>
              <ErrorMessage errors={errors} name='email' />
            </div>
            <div className='absolute top-[2.875rem] right-[0.85rem]'>
              {errors.email ? <RedCircle /> : email ? <GreenCheck /> : <></>}
            </div>
          </div>

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

            <div className='absolute top-[2.875rem] h-4 right-[0.85rem] flex items-center justify-start gap-1 w-[2.625rem]'>
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
              {errors.password ? (
                <RedCircle />
              ) : password ? (
                <GreenCheck />
              ) : (
                <></>
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

            <div className='absolute top-[2.875rem] h-4 right-[0.85rem] flex items-center justify-start gap-1 w-[2.625rem]'>
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
              {errors.password_confirmation ? (
                <RedCircle />
              ) : password_confirmation ? (
                <GreenCheck />
              ) : (
                <></>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='bg-red-650 text-white text-base  h-[2.375rem]  leading-[150%]  w-full rounded-md '
          >
            {t('form.register.submit')}
          </button>
        </form>

        <div className='mx-[2.125rem] mt-4 px-2 sm:mx-[7.5rem] h-[2.375rem] gap-2 flex items-center justify-center border-2 border-gray-350 rounded-md'>
          <Google />
          <h1 className='text-white text-base font-normal leading-[150%] overflow-ellipsis overflow-hidden h-6'>
            {t('form.register.google')}
          </h1>
        </div>

        <div className='flex justify-center items-center gap-1 mt-8'>
          <h1 className='text-base leading-[150%] font-normal text-gray-550'>
            {t('form.register.haveAccount')}
          </h1>
          <button
            className='text-base leading-[150%] font-normal text-blue-650 underline'
            onClick={() => setWhichForm('login')}
          >
            {t('form.register.logIn')}
          </button>
        </div>
      </div>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-blur-sm	'
        onClick={() => setWhichForm('')}
      />
      <div
        className='fixed top-5 right-5 md:hidden inline z-30 cursor-pointer'
        onClick={() => setWhichForm('')}
      >
        <CloseIcon />
      </div>
    </Fragment>
  );
};

export default Registration;
