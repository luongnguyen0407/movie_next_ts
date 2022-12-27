import { Swiper, SwiperSlide } from "swiper/react";
import Image, { ImageProps as NextImageProps } from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper";
import { SwiperProps } from "../../common/common";
import useSWR from "swr";
import { Movie } from "../../common/movie";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MILLISECOND_PER_HOUR = 60 * 60 * 1000;

const bannerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const HomeBanner = () => {
  const [movieActive, setMovieActive] = useState(0);
  const { data, error } = useSWR("/movie/popular", {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  const handleChangeSlide: SwiperProps["onSlideChange"] = (swiperCore) => {
    const { realIndex } = swiperCore;
    setMovieActive(realIndex);
  };
  if (!data) return null;
  const listMovies: Movie[] = data.results;
  return (
    <div>
      <AnimatePresence>
        <div className="w-full h-[500px] relative select-none ">
          <motion.div
            variants={bannerVariants}
            animate="animate"
            exit="exit"
            initial="initial"
            className="relative w-full h-full"
            key={"img"}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${listMovies[movieActive].backdrop_path}`}
              alt="banner"
              unoptimized
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <div className="absolute w-full banner top-100">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              onSlideChange={handleChangeSlide}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 0,
                slideShadows: true,
              }}
              loop
              modules={[EffectCoverflow]}
              // slideToClickedSlide
            >
              {listMovies.map((movie) => (
                <motion.div
                  variants={{
                    enter: {
                      opacity: 1,
                      speed: 300,
                    },
                    exit: {
                      opacity: 0.2,
                      y: 0,
                    },
                  }}
                  className="w-full"
                  animate="enter"
                  title="test"
                  key={movie.id}
                >
                  <SwiperSlide>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                  </SwiperSlide>
                </motion.div>
              ))}
            </Swiper>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default HomeBanner;
