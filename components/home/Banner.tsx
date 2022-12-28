import { Swiper, SwiperSlide } from "swiper/react";
import Image, { ImageProps as NextImageProps } from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation } from "swiper";
import { SwiperProps } from "../../common/common";
import useSWR from "swr";
import { Movie } from "../../common/movie";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageMotion from "../shared/ImageMotion";
import useDebounce from "../hooks/useDebounce";
import "swiper/css/navigation";
import YouTube from "react-youtube";
import axiosApi from "../../api/axiosApi";
const MILLISECOND_PER_HOUR = 60 * 60 * 1000;

const bannerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
interface DataRes {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: false;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
interface ResTrailer {
  id: number;
  results: DataRes[];
}

const transition = [0.33, 1, 0.68, 1];
const HomeBanner = () => {
  const [movieActive, setMovieActive] = useState(0);
  const [loadingTrailer, setLoadingTrailer] = useState(true);
  const [idTrailer, setIdTrailer] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const debouncedValue = useDebounce<number>(value, 200);
  const { data, error } = useSWR("/movie/popular", {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  const handleChangeSlide: SwiperProps["onSlideChange"] = (swiperCore) => {
    const { realIndex } = swiperCore;
    setValue(realIndex);
  };

  const getTrailerMovie = async (id: number) => {
    setLoadingTrailer(true);
    const data: ResTrailer = await axiosApi.get(`movie/${id}/videos`);
    if (data && data.results.length > 0) {
      setIdTrailer(data.results[data.results.length - 1].key);
    }
  };
  useEffect(() => {
    if (data) {
      setMovieActive(debouncedValue);
      getTrailerMovie(data.results[debouncedValue].id);
    }
  }, [debouncedValue]);
  if (!data) return null;
  const listMovies: Movie[] = data.results;

  return (
    <div>
      <AnimatePresence>
        <div className="w-full h-[460px] select-none overflow-hidden">
          <motion.div
            variants={bannerVariants}
            animate="animate"
            exit="exit"
            initial="initial"
            className="relative w-full h-full"
            key={"img"}
          >
            <div className="absolute inset-0 z-50 flex flex-col justify-center px-4 banner__overlay md:px-12"></div>
            <Image
              src={`https://image.tmdb.org/t/p/original${listMovies[movieActive].backdrop_path}`}
              alt="banner"
              unoptimized
              fill
              priority
              className="object-cover banner__overlay"
            />
            {idTrailer && (
              <YouTube
                className={"absolute inset-0 w-full h-full"}
                videoId={idTrailer} // defaults -> ''
                // id={string} // defaults -> ''
                // className={string} // defaults -> ''
                // iframeClassName={string} // defaults -> ''
                // style={object} // defaults -> {}
                // title={string} // defaults -> ''
                // loading={string} // defaults -> undefined
                // opts={obj} // defaults -> {}
                onReady={() => setLoadingTrailer(false)} // defaults -> noop
                onPause={() => setLoadingTrailer(true)} // defaults -> noop
                onEnd={() => setLoadingTrailer(true)} // defaults -> noop
                onError={() => setLoadingTrailer(true)} // defaults -> noop
                // onStateChange={func} // defaults -> noop
                // onPlaybackRateChange={func} // defaults -> noop
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
                  },
                }}
              />
            )}
          </motion.div>
          <motion.div
            variants={bannerVariants}
            animate="animate"
            initial="initial"
            transition={{ ease: transition, duration: 1 }}
          >
            <div className="container absolute text-white bottom-2/4 left-2/4 -translate-x-2/4 ">
              <p className="mb-2 text-4xl font-bold uppercase max-w-[60%] overflow-hidden whitespace-nowrap text-ellipsis">
                {listMovies[movieActive].title}
              </p>
              <p className="max-w-[40%] line-clamp-3 text-sm">
                {listMovies[movieActive].overview}
              </p>
            </div>
          </motion.div>

          {/* slide */}
          <div className="absolute w-full banner top-100">
            <Swiper
              className="!overflow-visible"
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              onSlideChange={handleChangeSlide}
              navigation
              coverflowEffect={{
                rotate: 0,
                stretch: 100,
                depth: 100,
                modifier: 0,
                slideShadows: true,
              }}
              loop
              modules={[EffectCoverflow, Navigation]}
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
                    className="w-full h-full"
                    animate={`${index == movieActive ? "active" : "hide"}`}
                    title="test"
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
