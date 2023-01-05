import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation, i18n } from 'next-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState} />
      <div
        className={`${
          i18n?.language === 'ka' ? 'font-helvetica-ka' : 'font-helvetica-en'
        }`}
      >
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
