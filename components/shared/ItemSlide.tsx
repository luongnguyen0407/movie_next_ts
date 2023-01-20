import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import ImageMotion from "./ImageMotion";
import { motion } from "framer-motion";
import { Movie } from "@/common/movie";
import { Tv } from "@/common/tv";

// const ItemSlide
interface ItemSlide {
  item: Movie | Tv;
  name: string;
  date: string;
}
const ItemSlide = ({ item, name, date }: ItemSlide) => {
  return (
    <>
      <motion.div
        className="relative flex flex-col w-full h-full text-white"
        whileHover={{ y: -5 }}
      >
        <div className="h-[500px] w-full">
          <ImageMotion
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt="movies"
            fill
            loading="lazy"
            className="object-cover rounded-lg"
            containerclassname="relative h-full "
          />
        </div>
        <span className="absolute top-2 -right-3">
          <CircularProgressbar
            className="w-10 h-10 font-bold"
            value={item.vote_average}
            background
            text={`${item.vote_average.toFixed(1)}%`}
            maxValue={10}
            styles={buildStyles({
              pathColor: `${
                item.vote_average > 7
                  ? "rgb(101 163 13)"
                  : item.vote_average > 5
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
            title={name}
            className="max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {name}
          </h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </motion.div>
    </>
  );
};

export default ItemSlide;
