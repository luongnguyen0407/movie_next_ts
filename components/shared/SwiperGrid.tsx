import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "../../common/movie";
import { Grid, Pagination } from "swiper";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageMotion from "./ImageMotion";

interface SwiperGridProps {
  data: Movie[];
}

const ROW_SLIDE = 2;

const SwiperGrid = ({ data }: SwiperGridProps) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        grid={{
          rows: ROW_SLIDE,
          fill: "row",
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="p-3 mySwiper"
        breakpoints={{
          1280: {
            slidesPerView: 6,
            grid: {
              rows: ROW_SLIDE,
            },
          },
          1024: {
            slidesPerView: 5,
            grid: {
              rows: ROW_SLIDE,
            },
          },
          768: {
            slidesPerView: 4,
            grid: {
              rows: ROW_SLIDE,
            },
          },
          640: {
            slidesPerView: 3,
            grid: {
              rows: ROW_SLIDE,
            },
          },
          0: {
            slidesPerView: 2,
            grid: {
              rows: ROW_SLIDE,
            },
          },
        }}
      >
        {data &&
          data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link
                href={`/movie/details/${movie.id}`}
                className="w-full h-full"
              >
                <motion.div
                  className="relative flex flex-col w-full h-full text-white"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-[500px] w-full">
                    <ImageMotion
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt="movies"
                      fill
                      priority
                      className="object-cover rounded-lg"
                      containerclassname="relative h-full "
                    />
                  </div>
                  <span className="absolute top-2 -right-3">
                    <CircularProgressbar
                      className="w-10 h-10 font-bold"
                      value={movie.vote_average}
                      background
                      text={`${movie.vote_average}%`}
                      maxValue={10}
                      styles={buildStyles({
                        pathColor: `${
                          movie.vote_average > 7
                            ? "rgb(101 163 13)"
                            : movie.vote_average > 5
                            ? "rgb(234 179 8)"
                            : "rgb(239 68 68)"
                        }`,
                        textSize: "30px",
                        backgroundColor: "#0C111B",
                      })}
                    />
                  </span>
                  <div className="mt-2">
                    <h3
                      title={movie.title}
                      className="max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {movie.release_date}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SwiperGrid;
