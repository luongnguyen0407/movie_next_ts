import useSWR from "swr";
import TopRate from "../components/home/TopRate";
import MainLayout from "../components/layouts/MainLayout";
import HomeBanner from "../components/home/Banner";
import Head from "next/head";
import { Roboto } from "@next/font/google";
import { NextPageWithLayout } from "../common/common";
import { Movie } from "../common/movie";
import "swiper/css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
});
interface HomePageProps {
  topMovies: Movie[];
}
const HomePage: NextPageWithLayout<HomePageProps> = ({ topMovies }) => {
  console.log(topMovies);
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Trang chủ</title>
      </Head>
      <main className={roboto.className}>
        <HomeBanner />
        {/* {topMovies && <TopRate listMovies={topMovies} />} */}
        <TopRate />
      </main>
    </>
  );
};

// export async function getStaticProps() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//   );
//   const { results } = await res.json();
//   const topMovies = results;
//   return {
//     props: {
//       topMovies,
//     },
//     revalidate: 10, // In seconds
//   };
// }

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default HomePage;
