import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@docsearch/css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <section className="section">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </section>
    </>
  );
}

export default MyApp;
