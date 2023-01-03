import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className='bg-main-gradient h-screen flex flex-col items-center'>
      <Image
        src={'/assets/imgs/ghost.png'}
        width={121}
        height={137}
        alt='error ghost'
        className='lg:mt-[15.125rem] mt-[7.875rem] w-[7.563rem] h-[8.563rem]'
        priority
      />
      <div className='bg-zinc-150 w-[7.313rem] h-[0.875rem] rounded-[100%] mt-[1.688rem]' />
      <h1 className='lg:text-[2.938rem] text-2xl text-white mt-[1.75rem] leading-[150%] font-bold'>
        {t('404.whoops')}
      </h1>
      <h1 className='text-white leading-[150%] text-base lg:text-2xl font-medium mt-4 lg:mt-2 mb-8 lg:mb-[2.938rem]'>
        {t('404.mainText')}
      </h1>
      <Link
        href={'/'}
        className='bg-red-650 text-white text-base lg:text-xl leading-[150%] py-2 lg:py-2.5 px-7 lg:px-4 rounded-md '
      >
        {t('404.return')}
      </Link>
    </div>
  );
};

export default ErrorPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
