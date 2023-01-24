import { Fragment } from 'react';
import { ProfileEmailsDesktopProps } from './profileEmailsDesktopTypes';
import {
  NotVerified,
  Plus,
  Primary,
  useProfileEmailsDesktop,
} from 'components';

const ProfileEmailsDesktop: React.FC<ProfileEmailsDesktopProps> = ({
  emails,
  setIsAddEmailOpen,
}) => {
  const { t, mutateDelete, mutatePrimary } = useProfileEmailsDesktop();

  return (
    <Fragment>
      <div className='self-start'>
        {emails.map((email) => (
          <Fragment key={email.id}>
            <h1 className='text-medium text-white leading-[150%] block mt-10 self-start'>
              {t('user.profile.email')}
            </h1>
            <div className='flex justify-start items-center gap-8 w-full mt-2 flex-wrap'>
              <div
                className={`w-[27rem] xl:w-[33rem] rounded-md py-2 px-4 text-2xl flex justify-between items-center ${
                  email.is_primary
                    ? 'bg-primary text-white border border-green-750'
                    : email.email_verified_at === null
                    ? 'bg-not-verified text-white border border-amber-550'
                    : 'bg-gray-350  text-neutral-750 '
                }`}
              >
                <h1>{email.email}</h1>
                {email.is_primary ? (
                  <Primary />
                ) : email.email_verified_at === null ? (
                  <NotVerified />
                ) : (
                  ''
                )}
              </div>
              {email.is_primary ? (
                <h1 className='text-gray-350 leading-[150%] text-xl'>
                  {t('user.profile.primary')}
                </h1>
              ) : (
                ''
              )}
              {!email.is_primary && (
                <div className='flex'>
                  {email.email_verified_at ? (
                    <button
                      className='text-gray-350 leading-[150%] text-xl mr-4'
                      onClick={() => mutatePrimary(email.id)}
                    >
                      {t('user.profile.makePrimary')}
                    </button>
                  ) : (
                    <h1 className='text-gray-350 leading-[150%] text-xl mr-4'>
                      {t('user.profile.notVerified')}
                    </h1>
                  )}
                  <button
                    className='text-gray-350 leading-[150%] text-xl border-l border-l-gray-550 pl-4'
                    onClick={() => mutateDelete(email.id)}
                  >
                    {t('user.profile.remove')}
                  </button>
                </div>
              )}
            </div>
          </Fragment>
        ))}
        <button
          className='mt-10 p-4 border border-zinc-350 rounded-md text-white text-xl leading-[150%] flex justify-center items-center gap-2'
          onClick={() => setIsAddEmailOpen(true)}
        >
          <Plus />
          {t('user.profile.addEmail')}
        </button>
      </div>
    </Fragment>
  );
};

export default ProfileEmailsDesktop;
