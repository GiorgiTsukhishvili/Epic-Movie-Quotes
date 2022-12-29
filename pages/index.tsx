import {
  LandingTop,
  LandingPictureAnimation,
  Navbar,
  Login,
  Footer,
  ForgotPassword,
  EmailSent,
} from 'components';
import { Fragment } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useFormChooser } from 'hooks';

export default function Home() {
  const { whichForm, setWhichForm } = useFormChooser();

  return (
    <Fragment>
      <Navbar setWhichForm={setWhichForm} />
      <LandingTop />
      <LandingPictureAnimation />
      {whichForm === 'login' ? (
        <Login setWhichForm={setWhichForm} />
      ) : whichForm === 'forgot' ? (
        <ForgotPassword setWhichForm={setWhichForm} />
      ) : whichForm === 'forgot-sent' ? (
        <EmailSent
          setWhichForm={setWhichForm}
          header={'form.verify.headerOne'}
          main={'form.verify.mainOne'}
          goToEmail={'form.verify.goToEmail'}
          skip={'form.verify.skip'}
        />
      ) : whichForm === 'registration-sent' ? (
        <EmailSent
          setWhichForm={setWhichForm}
          header={'form.verify.headerTwo'}
          main={'form.verify.mainTwo'}
          goToEmail={'form.verify.goToEmail'}
        />
      ) : (
        <></>
      )}
      <Footer />
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
