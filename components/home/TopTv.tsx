import useSWR from "swr";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import ImageNext from "../shared/ImageNext";
import ImageMotion from "../shared/ImageMotion";
import Heading from "../shared/Heading";
import ButtonPlay from "../shared/ButtonPlay";
import { Tv } from "@/common/tv";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Mousewheel, Pagination } from "swiper";
import { bannerVariants, MILLISECOND_PER_HOUR } from "@/common/common";
import { AnimatePresence, motion } from "framer-motion";
import "swiper/css/pagination";
import "swiper/css/bundle";
import "swiper/css";
// Import Swiper styles
const TopTv = () => {
  const { data, error } = useSWR(`/tv/top_rated`, {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  const [tvActive, setTvActive] = useState(0);
  const handleChangeSlide: SwiperProps["onSlideChange"] = useCallback(
    (swiperCore: any) => {
      const { realIndex } = swiperCore;
      setTvActive(realIndex);
    },
    []
  );
  if (!data) return <p>loading</p>;
  const listData: Tv[] = data.results;
  return (
    <div className="container">
      <Heading>Phim truyền hình</Heading>
      <div className=" flex justify-between h-[400px] top-slide my-10">
        <div className="relative flex-1 h-full overflow-hidden">
          <motion.div
            variants={bannerVariants}
            animate={`animate`}
            initial="initial"
            className="relative w-full h-full"
            key={tvActive}
          >
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 banner__overlay md:px-12"></div>
            <ImageNext
              src={`https://image.tmdb.org/t/p/original${listData[tvActive].backdrop_path}`}
              alt="movies"
              className="object-cover rounded-lg"
            />
          </motion.div>
          <>
            <motion.div
              initial={{ x: "-100vw" }}
              transition={{ ease: [0.33, 1, 0.68, 1], duration: 1 }}
              key={tvActive}
              animate={{ x: 0 }}
              className="absolute top-1/4 left-7"
            >
              <p className="overflow-hidden text-xl font-semibold lg:text-3xl max-w-[400px] whitespace-nowrap text-ellipsis">
                {listData[tvActive].name}
              </p>
              <p className="w-[600px] overflow-hidden text-xs font-semibold lg:text-sm line-clamp-3">
                {listData[tvActive].overview}
              </p>
            </motion.div>
          </>
          <ButtonPlay
            action={tvActive}
            src={`/tv/details/${listData[tvActive].id}`}
            className="-translate-x-2/4 bottom-1/4 left-2/4"
          />
        </div>
        <div className="overflow-hidden w-[300px]">
          <Swiper
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={30}
            mousewheel={true}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            loop
            onSlideChange={handleChangeSlide}
            modules={[Mousewheel, Pagination]}
            className="!pr-7 mySwiper !overflow-visible max-w-[300px] float-right"
          >
            {listData.map((show, index) => (
              <SwiperSlide key={show.id}>
                <motion.div
                  variants={{
                    active: {
                      opacity: 1,
                      speed: 300,
                      x: -40,
                    },
                    hide: {
                      opacity: 0.1,
                      y: 0,
                    },
                  }}
                  animate={`${index == tvActive ? "active" : "hide"}`}
                  className="w-[100px] h-[150px] relative"
                >
                  <ImageMotion
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
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
    </div>
  );
};

export default TopTv;
