import { ProfileSubmitMobileProps } from './profileSubmitMobile';
import useProfileSubmitMobile from './useProfileSubmitMobile';

const ProfileSubmitMobile: React.FC<ProfileSubmitMobileProps> = ({
  cancel,
  submit,
}) => {
  const { t } = useProfileSubmitMobile();

  return (
    <div className='flex justify-center'>
      <div className='relative w-[22.75rem] min-h-[13.125rem] mx-4'>
        <div className='md:hidden w-full h-full bg-email-sent opacity-30 absolute top-0 rounded-[0.625rem] rotate-180 pointer-events-none' />
        <div className='z-10 flex justify-center pt-[4.25rem] pb-[2.75rem] border-b border-profile-border'>
          <h1 className='text-white leading-9.5 text-base text-center'>
            {t('user.profile.areYouSure')}
          </h1>
        </div>
        <div className='w-full flex justify-between gap-8 mt-6 mb-4 px-7'>
          <button
            className='text-gray-350 text-xl leading-9.5'
            onClick={() => cancel()}
          >
            {t('user.profile.cancel')}
          </button>
          <button
            className='text-white leading-9.5 px-4 py-2 text-xl bg-red-650 rounded-md'
            onClick={() => submit()}
          >
            {t('user.profile.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSubmitMobile;
