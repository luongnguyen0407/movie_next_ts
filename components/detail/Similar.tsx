import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { MILLISECOND_PER_HOUR } from "@/common/common";
import { Movie } from "@/common/movie";
import "react-circular-progressbar/dist/styles.css";
import { Tv } from "@/common/tv";
import Link from "next/link";
import ItemSlide from "../shared/ItemSlide";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
interface SimilarProps {
  type: string;
  id: number;
}

const Similar: FC<SimilarProps> = ({ type, id }) => {
  const { data, error } = useSWR(`/${type}/${id}/similar`, {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  if (!data || !data.results) return null;
  return (
    <div className="mt-4 global_slide">
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.results.map((item: Movie & Tv) => (
          <SwiperSlide key={item.id}>
            <Link
              href={`/${type}/details/${item.id}`}
              className="w-full select-none h-[400px] relative z-50"
              passHref
            >
              <ItemSlide
                item={item}
                date={item.release_date || item.first_air_date}
                name={item.name || item.title}
              ></ItemSlide>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(Similar);
