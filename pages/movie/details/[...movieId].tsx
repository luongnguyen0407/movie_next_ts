import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Banner from "@/components/movieDetail/BannerImg";
import Heading from "@/components/shared/Heading";
import ButtonCommon from "@/components/shared/ButtonCommon";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import { Movie } from "@/common/movie";
import { BASE_API, KEY_API, REVALIDATE_TIME } from "@/common/common";
import Image from "next/image";
const DetailPage = ({ data }: { data: Movie }) => {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading</p>;
  }
  return (
    <div className="h-[900px]">
      <div className="relative">
        <Banner
          className="h-[400px]"
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        ></Banner>
      </div>
      <div className="container flex gap-x-10">
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 20 }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt=""
            width={200}
            height={300}
            className="relative z-10 -mt-20 rounded-sm"
          />
        </motion.div>
        <div className="relative z-10 flex-1 -mt-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block"
          >
            <ButtonCommon icon>Xem ngay</ButtonCommon>
          </motion.div>
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 20 }}
          >
            <Heading>{data.title}</Heading>
            <h2 className="text-sm md:text-base">{data.overview}</h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${BASE_API}/movie/top_rated?api_key=${KEY_API}`);
  const data = await res.json();
  return {
    paths: data.results
      .splice(0, 5)
      .map((movie: Movie) => ({ params: { movieId: [`${movie.id}`] } })),
    fallback: true, // See the "fallback" section below
  };
}

export const getStaticProps: GetStaticProps<{ data: Movie }> = async (
  context
) => {
  const movieId = context.params?.movieId;
  const res = await fetch(`${BASE_API}/movie/${movieId}?api_key=${KEY_API}`);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
    revalidate: REVALIDATE_TIME,
  };
};
DetailPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default DetailPage;
