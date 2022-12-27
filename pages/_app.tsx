import { SWRConfig } from "swr";
import { AppPropsWithLayout } from "../common/common";
import axiosApi from "../api/axiosApi";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SWRConfig
      value={{ fetcher: (url) => axiosApi.get(url), shouldRetryOnError: false }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
}
