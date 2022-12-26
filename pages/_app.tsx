import { AppPropsWithLayout } from "../common/common";
import EmptyLayout from "../components/layouts/EmptyLayout";
import "../style/globals.css";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
