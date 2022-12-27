import {
  LandingTop,
  LandingPictureAnimation,
  Navbar,
  useFormChooser,
  Login,
} from 'components';
import { Fragment } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function Home() {
  const { whichForm, setWhichForm } = useFormChooser();

  return (
    <Fragment>
      <Navbar setWhichForm={setWhichForm} />
      <LandingTop />
      <LandingPictureAnimation />
      {whichForm === 'login' ? <Login setWhichForm={setWhichForm} /> : <></>}
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
