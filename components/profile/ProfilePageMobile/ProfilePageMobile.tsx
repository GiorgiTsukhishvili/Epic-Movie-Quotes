import {
  HalfArrow,
  ProfileAddEmailMobile,
  ProfileEmailsMobile,
  ProfileNameMobile,
  ProfilePasswordMobile,
  ProfileSubmitMobile,
  useProfilePageMobile,
} from 'components';
import { Fragment } from 'react';
import Image from 'next/image';
import { ProfilePageMobileProps } from './profilePageMobileTypes';

const ProfilePageMobile: React.FC<ProfilePageMobileProps> = ({
  data,
  addNewMessage,
}) => {
  const {
    t,
    handleFileUploadMobile,
    getValuesMobile,
    nameEditStep,
    setNameEditStep,
    registerMobile,
    errorsMobile,
    submitChanges,
    cancelChanges,
    passwordEditStep,
    setPasswordEditStep,
    setErrorMobile,
    isFileUploaded,
    emailStep,
    setEmailStep,
    submitEmail,
  } = useProfilePageMobile(data, addNewMessage);

  return (
    <Fragment>
      {nameEditStep === '' && passwordEditStep === '' && emailStep === '' ? (
        <div className='z-10 w-full min-h-[33.438rem] items-center flex-col relative justify-start flex'>
          <div className='bg-zinc-750 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />

          <div className='z-10  w-full min-h-[31.25rem] flex items-center flex-col justify-start '>
            {getValuesMobile().image !== '' && (
              <Image
                src={
                  typeof getValuesMobile().image === 'string'
                    ? (getValuesMobile().image as string)
                    : URL.createObjectURL(getValuesMobile().image as Blob)
                }
                alt='uploaded-photo'
                width={900}
                height={500}
                className='w-[11.75rem] h-[11.75rem] object-cover rounded-full translate-y-6 '
              />
            )}
            <div className=' translate-y-6 flex flex-col justify-start items-center mt-2'>
              <input
                type='file'
                accept='image/*'
                multiple
                onChange={(e) => handleFileUploadMobile(e.target.files)}
                className='w-0 h-0 opacity-0'
                id='profile-photo-mobile'
              />
              <label
                htmlFor='profile-photo-mobile'
                className='text-xl block text-white leading-[150%] cursor-pointer'
              >
                {t('user.profile.newPhoto')}
              </label>

              <div>
                <label
                  htmlFor='name'
                  className='text-medium text-white leading-[150%] block  mt-[3.75rem]'
                >
                  {t('user.profile.username')}
                </label>

                <div className='flex justify-between w-[17rem] xs:w-[22.75rem]  items-center gap-8 mt-2 border-b border-b-profile-border '>
                  <h1 className='  text-white  rounded-md py-2 text-lg'>
                    {getValuesMobile().name}
                  </h1>
                  <button
                    className='text-gray-350 leading-[150%]  text-lg cursor-pointer'
                    onClick={() => setNameEditStep('first')}
                  >
                    {t('user.profile.edit')}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='text-medium text-white leading-[150%] block  mt-[3.75rem]'
              >
                {t('user.profile.password')}
              </label>

              <div className='flex justify-between w-[17rem] xs:w-[22.75rem]  items-center gap-8 mt-2 border-b border-b-profile-border '>
                <h1 className='  text-white  rounded-md py-2 text-lg'>
                  ••••••••••••
                </h1>
                <button
                  className='text-gray-350 leading-[150%]  text-lg cursor-pointer'
                  onClick={() => setPasswordEditStep('first')}
                >
                  {t('user.profile.edit')}
                </button>
              </div>

              <div
                className='flex justify-between items-center mt-8 mb-[5.625rem] cursor-pointer'
                onClick={() => setEmailStep('first')}
              >
                <h1 className='text-white leading-[150%] text-base uppercase'>
                  {t('user.profile.email')}
                </h1>
                <HalfArrow />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {nameEditStep === 'first' ? (
        <ProfileNameMobile
          registerMobile={registerMobile}
          errorsMobile={errorsMobile}
          setNameEditStep={setNameEditStep}
          cancel={cancelChanges}
        />
      ) : nameEditStep === 'second' ? (
        <ProfileSubmitMobile cancel={cancelChanges} submit={submitChanges} />
      ) : (
        <></>
      )}

      {passwordEditStep === 'first' ? (
        <ProfilePasswordMobile
          registerMobile={registerMobile}
          errorsMobile={errorsMobile}
          setPasswordEditStep={setPasswordEditStep}
          cancel={cancelChanges}
          password={getValuesMobile().password}
          password_confirmation={getValuesMobile().password_confirmation}
          setErrorMobile={setErrorMobile}
        />
      ) : passwordEditStep === 'second' ? (
        <ProfileSubmitMobile cancel={cancelChanges} submit={submitChanges} />
      ) : (
        <></>
      )}

      {emailStep === 'first' ? (
        <ProfileEmailsMobile
          emails={data.emails}
          google_id={data.google_id}
          setEmailStep={setEmailStep}
        />
      ) : (
        <></>
      )}

      {emailStep === 'second' ? (
        <ProfileAddEmailMobile
          cancel={cancelChanges}
          registerMobile={registerMobile}
          errorsMobile={errorsMobile}
          setEmailStep={setEmailStep}
          getValuesMobile={getValuesMobile}
          setErrorMobile={setErrorMobile}
          emails={data.emails}
        />
      ) : emailStep === 'third' ? (
        <ProfileSubmitMobile cancel={cancelChanges} submit={submitEmail} />
      ) : (
        <></>
      )}

      {isFileUploaded &&
      nameEditStep === '' &&
      passwordEditStep === '' &&
      emailStep === '' ? (
        <div className='w-full flex justify-end gap-8 mt-10 pr-4'>
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
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default ProfilePageMobile;
