import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "@/common/movie";
import { Grid, Pagination } from "swiper";
import Link from "next/link";
import ItemSlide from "./ItemSlide";

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
                passHref
              >
                <ItemSlide
                  item={movie}
                  date={movie.release_date}
                  name={movie.title}
                ></ItemSlide>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SwiperGrid;
