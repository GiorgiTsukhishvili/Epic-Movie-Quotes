import 'styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation, i18n } from 'next-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from 'state';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(function () {
    return new QueryClient();
  });

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default appWithTranslation(App);
