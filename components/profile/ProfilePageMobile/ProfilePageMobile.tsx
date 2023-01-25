import {
  ProfileNameMobile,
  ProfileSubmitMobile,
  useProfilePageMobile,
} from 'components';
import { Fragment } from 'react';
import Image from 'next/image';
import { ProfilePageMobileProps } from './profilePageMobileTypes';

const ProfilePageMobile: React.FC<ProfilePageMobileProps> = ({ data }) => {
  const {
    t,
    handleFileUploadMobile,
    getValuesMobile,
    NameEditStep,
    setNameEditStep,
    registerMobile,
    errorsMobile,
    submitChanges,
    cancelChanges,
  } = useProfilePageMobile(data);

  return (
    <Fragment>
      {NameEditStep === '' ? (
        <div className='z-10 w-full min-h-[33.438rem] items-center flex-col relative justify-start flex'>
          <div className='bg-zinc-750 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />

          <div className='absolute z-10 top-0 left-0 w-full h-[500px] flex items-center flex-col justify-start '>
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
                    className='text-gray-350 leading-[150%]  text-lg'
                    onClick={() => setNameEditStep('first')}
                  >
                    {t('user.profile.edit')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {NameEditStep === 'first' ? (
        <ProfileNameMobile
          registerMobile={registerMobile}
          errorsMobile={errorsMobile}
          setNameEditStep={setNameEditStep}
        />
      ) : NameEditStep === 'second' ? (
        <ProfileSubmitMobile cancel={cancelChanges} submit={submitChanges} />
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default ProfilePageMobile;
