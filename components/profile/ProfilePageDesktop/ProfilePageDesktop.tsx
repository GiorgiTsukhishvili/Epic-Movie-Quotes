import Image from 'next/image';
import { Fragment } from 'react';
import { ProfilePageDesktopProps } from './profilePageDesktopTypes';
import useProfilePageDesktop from './useProfilePageDesktop';

const ProfilePageDesktop: React.FC<ProfilePageDesktopProps> = ({ data }) => {
  const {
    t,
    register,
    handleFileUpload,
    getValues,
    isNameEditOpen,
    setIsNameEditOpen,
    isPasswordEditOpen,
    isFileUploaded,
    submitChanges,
    cancelChanges,
  } = useProfilePageDesktop(data);

  return (
    <Fragment>
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
        <div className='-translate-y-[5.875rem] flex flex-col justify-start items-center mt-2'>
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
            className='text-xl block text-white leading-[150%] cursor-pointer'
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
            {isNameEditOpen ? (
              <Fragment>
                <input
                  type='text'
                  className='w-[27rem]  mt-2 inline xl:w-[33rem]  bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl '
                  {...register('name')}
                />
                <h1 className='text-gray-350 leading-[150%] text-xl inline mr-8 opacity-0'>
                  {t('user.profile.edit')}
                </h1>
              </Fragment>
            ) : (
              <div className='flex justify-center items-center gap-8 w-full mt-2 '>
                <h1 className='w-[27rem] xl:w-[33rem] bg-gray-350 rounded-md py-2 px-4 text-neutral-750 text-2xl '>
                  {getValues().name}
                </h1>
                <button
                  className='text-gray-350 leading-[150%] text-xl '
                  onClick={() => setIsNameEditOpen(true)}
                >
                  {t('user.profile.edit')}
                </button>
              </div>
            )}
          </div>
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
