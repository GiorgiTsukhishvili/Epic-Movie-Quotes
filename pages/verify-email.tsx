import { useVerifyEmail } from 'hooks';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const VerifyEmail = () => {
  const { t } = useVerifyEmail();

  return (
    <div className='bg-gray-950 min-h-screen flex justify-center items-center'>
      <h1 className='font-medium text-white text-4xl'>
        {t('verifyEmail.wait')}
      </h1>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default VerifyEmail;
