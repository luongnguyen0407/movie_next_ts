import { useRouter } from "next/router";
import React, { ReactElement, useRef } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Banner from "@/components/movieDetail/BannerImg";
import Heading from "@/components/shared/Heading";
import { GetStaticProps } from "next";
import { Movie } from "@/common/movie";
import { BASE_API, KEY_API, REVALIDATE_TIME } from "@/common/common";
import HeaderDetail from "@/components/detail/HeaderDetail";
import DetailContent from "@/components/detail/DetailContent";
import Similar from "@/components/detail/Similar";
const DetailPage = ({ data }: { data: Movie }) => {
  const videoView = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading</p>;
  }
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
          name={data.title}
          overview={data.overview as string}
          videoView={videoView}
        ></HeaderDetail>
        <DetailContent
          type="movie"
          genres={data.genres}
          id={data.id}
          movie
          videoView={videoView}
        ></DetailContent>
        <div>
          <Heading>Phim tương tự</Heading>
          <Similar id={data.id} type="movie"></Similar>
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
