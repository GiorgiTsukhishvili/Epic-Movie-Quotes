import { SideNavbar, UserNavbar } from 'components';
import useProfile from 'hooks/useProfile';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment } from 'react';

const Profile = () => {
  const {} = useProfile();

  return (
    <Fragment>
      <div className='bg-gray-950 min-h-screen'>
        <UserNavbar isProfilePage={true} />
        <div className='flex items-start'>
          <div className='hidden min-w-[26.875rem] lg:inline'>
            <SideNavbar isProfilePage={true} />
          </div>
          <div className='w-full px-9 lg:pl-0 lg:pr-[4.375rem]'></div>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default Profile;
