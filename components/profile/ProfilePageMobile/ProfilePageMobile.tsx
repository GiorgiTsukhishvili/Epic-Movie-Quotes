import { UserAllInfoTypes } from 'types';
import { useProfilePageMobile } from 'components';
import { Fragment } from 'react';
import Image from 'next/image';

const ProfilePageMobile: React.FC<{ data: UserAllInfoTypes }> = ({ data }) => {
  const {
    t,

    handleFileUpload,
    getValues,

    setIsNameEditOpen,
  } = useProfilePageMobile(data);

  return (
    <Fragment>
      <div className='bg-zinc-750 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />

      <div className='absolute z-10 top-0 left-0 w-full h-[500px] flex items-center flex-col justify-start '>
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
            className='w-[11.75rem] h-[11.75rem] object-cover rounded-full translate-y-6 '
          />
        )}
        <div className=' translate-y-6 flex flex-col justify-start items-center mt-2'>
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
              className='text-medium text-white leading-[150%] block  mt-[3.75rem]'
            >
              {t('user.profile.username')}
            </label>

            <div className='flex justify-between w-[17rem] xs:w-[22.75rem]  items-center gap-8 mt-2 border-b border-b-profile-border '>
              <h1 className='  text-white  rounded-md py-2 text-lg'>
                {getValues().name}
              </h1>
              <button
                className='text-gray-350 leading-[150%]  text-lg'
                onClick={() => setIsNameEditOpen(true)}
              >
                {t('user.profile.edit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePageMobile;
