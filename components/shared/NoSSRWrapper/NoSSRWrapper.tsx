import dynamic from 'next/dynamic';
import React, { Fragment, ReactNode } from 'react';

const NonSSRWrapper = ({ children }: { children: ReactNode }) => (
  <Fragment>{children}</Fragment>
);

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
