import { SWRConfig } from "swr";
import { AppPropsWithLayout } from "../common/common";
import NextNProgress from "nextjs-progressbar";
import axiosApi from "../api/axiosApi";
import "../styles/globals.css";
import "../styles/home.css";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig
      value={{ fetcher: (url) => axiosApi.get(url), shouldRetryOnError: false }}
    >
      <NextNProgress color="red" />
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
}
