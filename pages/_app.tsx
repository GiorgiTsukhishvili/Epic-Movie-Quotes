import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation, i18n } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${
        i18n?.language === 'ka' ? 'font-helvetica-ka' : 'font-helvetica-en'
      }`}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);
