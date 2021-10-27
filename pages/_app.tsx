import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "../components/NavBar";
import FeaturesSideNav from "../components/FeaturesSideNav";
import "@docsearch/css";

function MyApp({ Component, pageProps }: AppProps) {
  const { pagePath } = pageProps;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <NavBar pagePath={pagePath} />
      <div className="main-container">
        <aside className="menu is-hidden-touch">
          <FeaturesSideNav />
        </aside>
        <main>
          <div className="container">
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </>
  );
}

export default MyApp;
