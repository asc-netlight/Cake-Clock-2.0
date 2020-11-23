import "../styles.global.css";

import { AppPropsType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppPropsType): ReactElement => {
  return (
    <>
      <Head>
        <title>MY WIDGET</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2196f3" />
        <meta name="description" content="IT Minds internal dashboard" />
        <meta name="robots" content="noindex" />
      </Head>
      <noscript>
        <h1>JavaScript must be enabled!</h1>
      </noscript>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
