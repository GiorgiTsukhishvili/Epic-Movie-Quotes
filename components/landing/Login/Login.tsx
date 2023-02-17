import { CloseIcon, Google, GreenCheck, RedCircle, useLogin } from 'components';
import React, { Fragment } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { LoginProps } from './loginTypes';

const Login: React.FC<LoginProps> = ({ setWhichForm }) => {
  const {
    t,
    register,
    onSubmit,
    handleSubmit,
    errors,
    login,
    password,
    redirectGoogle,
  } = useLogin();

  return (
    <Fragment>
      <div className='md:pt-[3.313rem] pt-[4.5rem] text-center fixed md:w-[37.563rem] md:h-[35.125rem] h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]'>
        <h1 className='text-white text-2xl md:text-[2rem] font-medium leading-[120%]'>
          {t('form.login.header')}
        </h1>
        <h1 className='text-gray-550 mt-3 text-base font-normal leading-9.5 px-[2.125rem] sm:px-[7.5rem]'>
          {t('form.login.welcomeBack')}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='px-[2.125rem] sm:px-[7.5rem] flex flex-col items-start mt-8'
        >
          <div className='w-full flex flex-col items-start relative'>
            <label
              htmlFor='login'
              className='text-base text-white font-normal leading-9.5 mb-2'
            >
              {t('form.login.emailOrName')}
            </label>
            <input
              type='text'
              {...register('login', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                minLength: {
                  value: 3,
                  message: t('form.login.minLength'),
                },
              })}
              className={`${
                errors.login
                  ? 'border-red-550'
                  : login
                  ? 'border-green-750'
                  : 'border-gray-350'
              } focus:shadow-input-custom focus:outline-none w-full border-2 pr-10 rounded-md bg-gray-350 text-gray-550 px-[0.813rem] py-[0.438rem] placeholder-gray-550`}
              placeholder={`${t('form.login.emailOrNameInput')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1'>
              <ErrorMessage errors={errors} name='login' />
            </div>
            <div className='absolute top-[2.875rem] right-[0.85rem]'>
              {errors.login ? <RedCircle /> : login ? <GreenCheck /> : <></>}
            </div>
          </div>

          <div className='w-full flex flex-col items-start relative'>
            <label
              htmlFor='password'
              className='text-base text-white font-normal leading-9.5 mb-2'
            >
              {t('form.login.password')}
            </label>
            <input
              type='password'
              {...register('password', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                minLength: {
                  value: 3,
                  message: t('form.login.minLength'),
                },
              })}
              className={`focus:shadow-input-custom focus:outline-none w-full border-2 pr-10 rounded-md bg-gray-350 text-gray-550 px-[0.813rem] py-[0.438rem] placeholder-gray-550 ${
                errors.password
                  ? 'border-red-550'
                  : password
                  ? 'border-green-750'
                  : 'border-gray-350'
              }`}
              placeholder={`${t('form.login.password')}`}
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-9.5 my-1'>
              <ErrorMessage errors={errors} name='password' />
            </div>

            <div className='absolute top-[2.875rem] right-[0.85rem]'>
              {errors.password ? (
                <RedCircle />
              ) : password ? (
                <GreenCheck />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center mb-4 w-full '>
            <div className='flex gap-2 items-center'>
              <input
                type='checkbox'
                {...register('remember')}
                className='rounded-[0.25rem] w-4 h-4 cursor-pointer'
              />
              <label
                htmlFor='remember'
                className='text-base font-normal text-white leading-9.5'
              >
                {t('form.login.rememberMe')}
              </label>
            </div>
            <h1
              className='text-base leading-9.5 font-normal text-blue-650 underline cursor-pointer'
              onClick={() => setWhichForm('forgot')}
            >
              {t('form.login.forgotPassword')}
            </h1>
          </div>

          <button
            type='submit'
            className='bg-red-650 hover:bg-red-750 text-white text-base  h-[2.375rem]  leading-9.5  w-full rounded-md '
          >
            {t('form.login.singIn')}
          </button>
        </form>

        <div
          className='mx-[2.125rem] cursor-pointer mt-4 sm:mx-[7.5rem] h-[2.375rem] gap-2 flex items-center justify-center border-2 border-gray-350 rounded-md'
          onClick={() => redirectGoogle()}
        >
          <Google />
          <h1 className='text-white text-base font-normal leading-9.5'>
            {t('form.login.loginWithGoogle')}
          </h1>
        </div>

        <div className='flex justify-center items-center gap-1 mt-8'>
          <h1 className='text-base leading-9.5 font-normal text-gray-550'>
            {t('form.login.alreadyHaveAccount')}
          </h1>
          <button
            className='text-base leading-9.5 font-normal text-blue-650 underline'
            onClick={() => setWhichForm('registration')}
          >
            {t('navbar.singUp')}
          </button>
        </div>
      </div>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-filter backdrop-blur-main-page '
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

export default Login;
