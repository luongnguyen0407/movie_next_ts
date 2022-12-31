import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Banner from "@/components/movieDetail/BannerImg";
import Heading from "@/components/shared/Heading";
import ButtonCommon from "@/components/shared/ButtonCommon";
import { GetStaticProps } from "next";
import { BASE_API, KEY_API, REVALIDATE_TIME } from "@/common/common";
import Image from "next/image";
import { Tv } from "@/common/tv";
const DetailTvPage = ({ data }: { data: Tv }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className="relative">
        <Banner
          className="h-[400px]"
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        ></Banner>
      </div>
      <div className="container flex gap-x-10">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt=""
          width={200}
          height={300}
          className="relative z-10 -mt-20 rounded-sm"
        />
        <div className="relative z-10 -mt-14">
          <ButtonCommon icon>Xem ngay</ButtonCommon>
          <div>
            <Heading>{data.name}</Heading>
            <h2 className="text-sm md:text-base">{data.overview}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${BASE_API}/tv/top_rated?api_key=${KEY_API}`);
  const data = await res.json();
  return {
    paths: data.results
      .splice(0, 5)
      .map((tv: Tv) => ({ params: { tvid: [`${tv.id}`] } })),
    fallback: true, // See the "fallback" section below
  };
}

export const getStaticProps: GetStaticProps<{ data: Tv }> = async (context) => {
  const tvid = context.params?.tvid;
  const res = await fetch(`${BASE_API}/tv/${tvid}?api_key=${KEY_API}`);
  const data = await res.json();
  if (!data.backdrop_path) {
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
DetailTvPage.getLayout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);
export default DetailTvPage;
