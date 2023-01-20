import SwiperGrid from "../shared/SwiperGrid";
import React from "react";
import Heading from "../shared/Heading";
import { Movie } from "@/common/movie";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/bundle";
import "react-circular-progressbar/dist/styles.css";
interface TopRateProps {
  listMovies: Movie[];
}

const TopRate = ({ listMovies }: TopRateProps) => {
  return (
    <section className="container top-rate global_slide">
      <Heading>Phim đánh giá cao</Heading>
      <div className="relative text-red-400 ">
        <SwiperGrid data={listMovies} />
      </div>
    </section>
  );
};

export default TopRate;
