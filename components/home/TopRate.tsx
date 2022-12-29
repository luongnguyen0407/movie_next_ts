import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Grid, Pagination } from "swiper";
import { Movie } from "../../common/movie";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ImageMotion from "../shared/ImageMotion";
import Image from "next/image";
import ImageNext from "../shared/ImageNext";
interface TopRateProps {
  listMovies?: Movie[];
}

const TopRate = ({ listMovies }: TopRateProps) => {
  return (
    <section className="container top-rate">
      <h1 className="my-5 text-3xl font-bold">Phim đánh giá cao</h1>
      <div className="relative text-red-400 h-[300px]">
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          grid={{
            rows: 3,
            fill: "row",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className="mySwiper"
        >
          {/* {listMovies && listMovies.map(() => <SwiperSlide>Hello</SwiperSlide>)} */}
          <SwiperSlide className="relative flex flex-col pb-16 text-white">
            <ImageNext
              alt="movie"
              src={
                "https://image.tmdb.org/t/p/w500/9z4jRr43JdtU66P0iy8h18OyLql.jpg"
              }
              className="!static"
            />
            <span className="absolute w-full bottom-12">
              <CircularProgressbar
                className="w-10 h-10 font-bold"
                value={6.6}
                text={`${6.6}%`}
                maxValue={10}
                styles={buildStyles({
                  pathColor: `bg-red-500`,
                  textSize: "30px",
                })}
              />
            </span>
            <div className="absolute bottom-0 left-0">
              <p>Ulice</p>
              <p>Sep 05, 2005</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>Hello</SwiperSlide>
          <SwiperSlide>Hello</SwiperSlide>
          <SwiperSlide>Hello</SwiperSlide>
          <SwiperSlide>Hello</SwiperSlide>
          <SwiperSlide>Hello</SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default TopRate;
