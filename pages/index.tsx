import { LandingTop, LandingPictureAnimation, Navbar } from 'components';
import { Fragment } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <LandingTop />
      <LandingPictureAnimation />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
