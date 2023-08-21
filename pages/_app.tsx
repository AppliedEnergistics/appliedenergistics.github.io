import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "../components/NavBar";
import "@docsearch/css";

function MyApp({ Component, pageProps }: AppProps) {
  const { pagePath } = pageProps;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <NavBar pagePath={pagePath} />
      <section className="section">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </section>
    </>
  );
}

export default MyApp;
