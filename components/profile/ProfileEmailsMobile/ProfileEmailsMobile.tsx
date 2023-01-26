import { ProfileEmailsMobileProps } from './profileEmailsMobileTypes';
import { NotVerified, Plus, Primary, useProfileEmailsMobile } from 'components';

const ProfileEmailsMobile: React.FC<ProfileEmailsMobileProps> = ({
  emails,
  google_id,
  setEmailStep,
}) => {
  const { t, mutateDelete, mutatePrimary } = useProfileEmailsMobile();

  return (
    <div className=' w-full min-h-[10.75rem] items-center flex-col relative justify-start flex'>
      <div className='bg-zinc-750 rounded-xl  backdrop-filter backdrop-blur-user-page -rotate-180  w-full h-full absolute top-0 left-0' />
      <div className='z-10 block w-full p-8 '>
        <div className='border-b border-profile-border max-w-[27rem] pb-6 mx-auto'>
          <h1 className='text-white leading-[150%] text-sm uppercase'>
            {t('user.profile.primary')}
          </h1>
          <div className='max-w-[27rem] mt-8 rounded-md py-2 px-4 text-xl flex justify-between items-center bg-primary text-white border border-green-750'>
            <h1>{emails[0].email}</h1>
            <Primary />
          </div>
        </div>

        {emails.length > 1 ? (
          <h1 className='text-white leading-[150%] text-sm max-w-[27rem] uppercase mt-[3.75rem] mb-6 mx-auto '>
            {t('user.profile.changePrimary')}
          </h1>
        ) : (
          <></>
        )}

        {emails.map(
          (email) =>
            !email.is_primary && (
              <div
                key={email.id}
                className='border-b border-profile-border max-w-[27rem] pb-6 mx-auto mb-8'
              >
                <h1 className='text-white leading-[150%] text-xl'>
                  {email.email}
                </h1>
                <div className='flex justify-between items-center mt-6'>
                  {email.email_verified_at ? (
                    <h1
                      onClick={() => mutatePrimary(email.id)}
                      className=' p-1 border border-zinc-350 rounded-md w-40 text-center text-white text-base leading-[150%] cursor-pointer'
                    >
                      {t('user.profile.makePrimary')}
                    </h1>
                  ) : (
                    <h1 className='italic text-amber-550 text-base leading-[150%] flex justify-center gap-2 items-center'>
                      <NotVerified />
                      {t('user.profile.notVerified')}
                    </h1>
                  )}
                  <h1
                    className='text-gray-350 text-base leading-[150%] cursor-pointer'
                    onClick={() => mutateDelete(email.id)}
                  >
                    {t('user.profile.remove')}
                  </h1>
                </div>
              </div>
            )
        )}
        {google_id === null && (
          <div className='max-w-[27rem] mx-auto mt-[3.75rem]'>
            <h1 className='text-white leading-[150%] text-sm  uppercase  mb-6 '>
              {t('user.profile.addEmail')}
            </h1>

            <button
              className='mt-10 p-1 border border-zinc-350 rounded-md w-full text-white text-base leading-[150%] flex justify-center items-center gap-2'
              onClick={() => setEmailStep('second')}
            >
              <Plus />
              {t('user.profile.addEmail')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEmailsMobile;
