import Similar from "@/components/detail/Similar";
import Seasons from "@/components/detail/Seasons";
import React, { ReactElement, useRef, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Heading from "@/components/shared/Heading";
import Banner from "@/components/movieDetail/BannerImg";
import { useRouter } from "next/router";
import { Tv } from "@/common/tv";
import { GetStaticProps } from "next";
import { BASE_API, KEY_API, REVALIDATE_TIME } from "@/common/common";
import HeaderDetail from "@/components/detail/HeaderDetail";
import DetailContent from "@/components/detail/DetailContent";
const DetailTvPage = ({ data }: { data: Tv }) => {
  const videoView = useRef<HTMLHeadingElement>(null);
  const [seasonActive, setSeasonActive] = useState(0);
  const [episodeActive, setEpisodeActive] = useState(1);
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading</p>;
  }
  const listSeasons = data.seasons.filter((item) => item.name != "Specials");
  return (
    <div className="pb-5">
      <div className="relative">
        <Banner
          className="h-[400px]"
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        ></Banner>
      </div>
      <div className="container">
        <HeaderDetail
          posterPath={data.poster_path}
          name={data.name}
          overview={data.overview}
          videoView={videoView}
        >
          <Seasons
            data={listSeasons}
            seasonActive={seasonActive}
            setSeasonActive={setSeasonActive}
            episodeActive={episodeActive}
            setEpisodeActive={setEpisodeActive}
          ></Seasons>
        </HeaderDetail>
        <DetailContent
          type="tv"
          genres={data.genres}
          id={data.id}
          videoView={videoView}
          seasonNumber={listSeasons[seasonActive]?.season_number}
          episodeActive={episodeActive}
        ></DetailContent>
        <div>
          <Heading>Chương trình tương tự</Heading>
          <Similar id={data.id} type="tv"></Similar>
        </div>
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
