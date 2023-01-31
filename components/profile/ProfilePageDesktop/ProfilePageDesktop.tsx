import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import { Fragment } from 'react';
import {
  ProfileEmailsDesktop,
  ProfilePasswordDesktop,
  useProfilePageDesktop,
} from 'components';
import { ProfilePageDesktopProps } from './profilePageDesktopTypes';

const ProfilePageDesktop: React.FC<ProfilePageDesktopProps> = ({
  data,
  addNewMessage,
}) => {
  const {
    t,
    register,
    handleFileUpload,
    getValues,
    isNameEditOpen,
    setIsNameEditOpen,
    isPasswordEditOpen,
    setIsPasswordEditOpen,
    isFileUploaded,
    submitChanges,
    cancelChanges,
    errors,
    isAddEmailOpen,
    setIsAddEmailOpen,
    setValue,
    submitEmail,
  } = useProfilePageDesktop(data, addNewMessage);

  return (
    <Fragment>
      {isAddEmailOpen && (
        <Fragment>
          <div
            className='h-screen w-screen fixed top-0 left-0 z-50 bg-add-email opacity-80 backdrop-filter backdrop-blur-main-page'
            onClick={() => setIsAddEmailOpen(false)}
          />
          <div className='w-[38rem] rounded-md h-[22.5rem] fixed z-[100] top-[21.625rem] left-1/2 bg-neutral-950 -translate-x-1/2'>
            <h1 className='text-white text-2xl font-medium leading-[150%] py-6 pl-8 border-b border-b-profile-border'>
              {t('user.profile.addEmail')}
            </h1>
            <label
              htmlFor='name'
              className='text-medium text-white leading-[150%] block mt-10 pl-8'
            >
              {t('user.profile.newEmail')}
            </label>
            <input
              type='text'
              {...register('email')}
              placeholder={t('user.profile.enterNewEmail')!}
              className=' ml-8  mt-2 inline w-[33rem] placeholder:text-neutral-950 bg-gray-350 rounded-md py-2 px-4 text-neutral-950 text-2xl'
            />
            <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1 ml-8'>
              <ErrorMessage errors={errors} name='email' />
            </div>
            <div className='w-full flex justify-end gap-8 mt-10 pr-12'>
              <button
                className='text-gray-350 text-xl leading-[150%]'
                onClick={() => {
                  setIsAddEmailOpen(false);
                  setValue('email', '');
                }}
              >
                {t('user.profile.cancel')}
              </button>
              <button
                className='text-white leading-[150%] px-4 py-2 text-xl bg-red-650 rounded-md'
                onClick={submitEmail}
              >
                {t('user.profile.save')}
              </button>
            </div>
          </div>
        </Fragment>
      )}
      <div className='z-10 w-full min-h-[33.438rem] items-center flex-col relative justify-start flex'>
        <div className='bg-neutral-950 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />
        {getValues().image !== '' && (
          <Image
            src={
              typeof getValues().image === 'string'
                ? (getValues().image as string)
                : URL.createObjectURL(getValues().image as Blob)
            }
            alt='uploaded-photo'
            width={900}
            height={500}
            className='w-[11.75rem] h-[11.75rem] object-cover rounded-full -translate-y-[5.875rem]'
          />
        )}
        <div className='-translate-y-[5.875rem] flex flex-col justify-start items-start mt-2 px-4'>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className='w-0 h-0 opacity-0'
            id='profile-photo'
          />
          <label
            htmlFor='profile-photo'
            className='text-xl block text-white leading-[150%] cursor-pointer self-center'
          >
            {t('user.profile.newPhoto')}
          </label>

          <div>
            <label
              htmlFor='name'
              className='text-medium text-white leading-[150%] block mt-10 '
            >
              {t('user.profile.username')}
            </label>
            <Fragment>
              <input
                type='text'
                className={`w-[27rem] ${
                  !isNameEditOpen ? 'pointer-events-none' : ''
                } mt-2 inline xl:w-[33rem]  bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl`}
                {...register('name', {
                  minLength: {
                    value: 3,
                    message: t('form.login.minLength'),
                  },
                  validate: {
                    onlyLoweAndNumbers: (value) => {
                      if (!/^[a-z0-9_\-]+$/.test(value)) {
                        return t('form.register.onlyLowerAndNumbers')!;
                      }
                    },
                  },
                })}
              />
              <h1
                className={`text-gray-350 leading-[150%] text-xl inline cursor-pointer ml-8 ${
                  isNameEditOpen ? 'opacity-0' : 'opacity-1'
                }`}
                onClick={() => setIsNameEditOpen(true)}
              >
                {t('user.profile.edit')}
              </h1>
              <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1 '>
                <ErrorMessage errors={errors} name='name' />
              </div>
              <div className='w-[27rem] xl:w-[33rem] border-b border-b-profile-border pt-7' />
            </Fragment>
          </div>

          {data.google_id ? (
            <Fragment>
              <h1 className='text-medium text-white leading-[150%] block mt-10 self-start'>
                {t('user.profile.email')}
              </h1>
              <div className='flex justify-start items-center gap-8 w-full mt-2 '>
                <h1 className='w-[27rem] xl:w-[33rem] bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl  '>
                  {data.emails[0].email}
                </h1>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <ProfileEmailsDesktop
                emails={data.emails}
                setIsAddEmailOpen={setIsAddEmailOpen}
              />
              <ProfilePasswordDesktop
                setIsPasswordEditOpen={setIsPasswordEditOpen}
                isPasswordEditOpen={isPasswordEditOpen}
                register={register}
                errors={errors}
                password={getValues().password}
              />
            </Fragment>
          )}
        </div>
      </div>
      {(isFileUploaded || isNameEditOpen || isPasswordEditOpen) && (
        <div className='w-full flex justify-end gap-8 mt-10'>
          <button
            className='text-gray-350 text-xl leading-[150%]'
            onClick={cancelChanges}
          >
            {t('user.profile.cancel')}
          </button>
          <button
            className='text-white leading-[150%] px-4 py-2 text-xl bg-red-650 rounded-md'
            onClick={submitChanges}
          >
            {t('user.profile.save')}
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePageDesktop;
