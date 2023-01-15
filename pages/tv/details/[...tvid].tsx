import React, { ReactElement, useRef, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/shared/Heading";
import Character from "@/components/detail/Character";
import ButtonCommon from "@/components/shared/ButtonCommon";
import Banner from "@/components/movieDetail/BannerImg";
import { useRouter } from "next/router";
import { Tv } from "@/common/tv";
import { GetStaticProps } from "next";
import { BASE_API, KEY_API, REVALIDATE_TIME } from "@/common/common";
import Seasons from "@/components/detail/Seasons";
const DetailTvPage = ({ data }: { data: Tv }) => {
  const videoView = useRef<HTMLHeadingElement>(null);
  const [seasonActive, setSeasonActive] = useState(0);
  const [episodeActive, setEpisodeActive] = useState(1);
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading</p>;
  }
  const handleScrollView = () => {
    if (videoView.current) {
      videoView.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const listSeasons = data.seasons.filter((item) => item.name != "Specials");
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
          className="relative z-10 -mt-20 rounded-sm max-h-[300px]"
        />
        <div className="relative z-10 -mt-14">
          <ButtonCommon icon onClick={handleScrollView}>
            Xem ngay
          </ButtonCommon>
          <div>
            <Heading>{data.name}</Heading>
            <h2 className="text-sm text-gray-200 md:text-base">
              {data.overview}
            </h2>
          </div>
          <div>
            <Seasons
              data={listSeasons}
              seasonActive={seasonActive}
              setSeasonActive={setSeasonActive}
              episodeActive={episodeActive}
              setEpisodeActive={setEpisodeActive}
            ></Seasons>
          </div>
        </div>
      </div>
      <div className="container flex items-center gap-x-3">
        <div className="w-1/5 ">
          <div className="flex gap-x-1">
            Thể Loại : <Link href={"/category"}>Drama</Link>
          </div>
          <div>Số tập</div>
          <div className="mt-5">
            <Heading className="text-xl">Cast</Heading>
            <Character idMovie={data.id} />
          </div>
        </div>
        <div className="flex-1" ref={videoView}>
          {/* <iframe
            className="w-full h-[500px]"
            allowFullScreen
            src={`https://2embed.org/embed/series?tmdb=${data.id}&s=${listSeasons[seasonActive].season_number}&e=${episodeActive}`}
          ></iframe> */}
        </div>
      </div>
      <div className="container">
        <Heading>Phim tương tự</Heading>
      </div>
    </div>
    // https://api.themoviedb.org/3/discover/tv?api_key=e05d4571d77fadcce4caaa76464df83b&with_genres=18
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
