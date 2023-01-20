import YouTube from "react-youtube";
import useSWR from "swr";
import ImageMotion from "../shared/ImageMotion";
import axiosApi from "@/api/axiosApi";
import { useState } from "react";
import {
  bannerVariants,
  MILLISECOND_PER_HOUR,
  SwiperProps,
} from "@/common/common";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataMoviesTrailer, Movie } from "@/common/movie";
import { FaceSmileIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Navigation } from "swiper";
import { AnimatePresence, motion } from "framer-motion";
import "swiper/css/navigation";
import "swiper/css";
import ButtonPlay from "../shared/ButtonPlay";
import Banner from "../movieDetail/BannerImg";
import BannerImg from "../movieDetail/BannerImg";

interface ResTrailer {
  id: number;
  results: DataMoviesTrailer[];
}
const transition = [0.33, 1, 0.68, 1];
const HomeBanner = () => {
  const [movieActive, setMovieActive] = useState(0);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [idTrailer, setIdTrailer] = useState<string>("");
  const { data, error } = useSWR("/movie/popular", {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  const handleChangeSlide: SwiperProps["onSlideChange"] = (swiperCore) => {
    const { realIndex } = swiperCore;
    setMovieActive(realIndex);
    if (data) getTrailerMovie(data?.results[realIndex]?.id);
  };
  const getTrailerMovie = async (id: number) => {
    setLoadingTrailer(true);
    const data: ResTrailer = await axiosApi.get(`movie/${id}/videos`);
    if (data && data.results.length > 0) {
      setIdTrailer(data.results[data.results.length - 1].key);
    }
  };
  if (!data) return null;
  const listMovies: Movie[] = data.results;
  return (
    <div>
      <AnimatePresence>
        <div className="relative w-full mb-5 select-none">
          <div className="relative overflow-hidden">
            <>
              <ButtonPlay
                action={idTrailer}
                src={`/movie/details/${listMovies[movieActive].id}`}
                className="top-2/4 right-1/4 -translate-y-2/4"
              />
            </>
            <BannerImg
              className="h-[460px]"
              src={`https://image.tmdb.org/t/p/original${listMovies[movieActive].backdrop_path}`}
            ></BannerImg>
            {/* {idTrailer && (
              <YouTube
                className={"absolute inset-0 w-full h-full"}
                videoId={idTrailer} // defaults -> ''
                onReady={() => setLoadingTrailer(false)} // defaults -> noop
                onPause={() => setLoadingTrailer(true)} // defaults -> noop
                onEnd={() => setLoadingTrailer(true)} // defaults -> noop
                onError={() => setLoadingTrailer(true)} // defaults -> noop
                onPlaybackQualityChange={() => 1080} // defaults -> noop
                iframeClassName={`relative w-full  aspect-w-16 aspect-h-9 h-[300%] -top-[100%] ${
                  loadingTrailer ? "hidden" : ""
                }`}
                opts={{
                  playerVars: {
                    modestbranding: 1,
                    controls: 0,
                    autoplay: 1,
                    mute: 1,
                    origin: process.env.NEXT_PUBLIC_DOMAIN_MAIN,
                  },
                }}
              />
            )} */}
            <>
              <motion.div
                variants={bannerVariants}
                animate="animate"
                initial="initial"
                transition={{ ease: transition, duration: 1 }}
                key={movieActive}
              >
                <div className="container absolute bottom-2/4 left-2/4 -translate-x-2/4 ">
                  <p className="mb-2 text-4xl font-bold uppercase max-w-[60%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {listMovies[movieActive].title}
                  </p>
                  <div className="flex items-center mb-2 gap-x-3">
                    <span className="flex items-center gap-2">
                      <FaceSmileIcon className="w-5 h-5 text-green-300" />
                      {listMovies[movieActive].vote_average}
                    </span>
                    <span className="flex items-center gap-2">
                      <HeartIcon className="w-5 h-5 text-red-300" />
                      {listMovies[movieActive].vote_count}
                    </span>
                  </div>
                  <p className="max-w-[40%] line-clamp-3 text-sm">
                    {listMovies[movieActive].overview}
                  </p>
                </div>
              </motion.div>
            </>
          </div>

          {/* slide */}

          <div className="relative z-40 w-full banner top-100">
            <Swiper
              className="!overflow-visible"
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              onSlideChange={handleChangeSlide}
              navigation
              spaceBetween={20}
              loop
              modules={[Navigation]}
              slideToClickedSlide
            >
              {listMovies.map((movie, index) => (
                <SwiperSlide key={movie.id}>
                  <motion.div
                    variants={{
                      active: {
                        opacity: 1,
                        speed: 300,
                        y: -40,
                      },
                      hide: {
                        opacity: 0.2,
                        y: 0,
                      },
                    }}
                    className="w-full h-[250px]"
                    animate={`${index == movieActive ? "active" : "hide"}`}
                    title="movie"
                  >
                    <ImageMotion
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="movies"
                      fill
                      className="object-cover rounded-lg"
                      containerclassname="relative h-full "
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default HomeBanner;
