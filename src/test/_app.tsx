

import * as React from "react";
import { AppProps } from "next/app";
import Header from 'app/projects/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Header />

    <Component {...pageProps} />
    </>;
}

export default MyApp;
