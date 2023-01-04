import React, { useCallback, useState } from "react";
import Heading from "../shared/Heading";
import { motion } from "framer-motion";
import { MILLISECOND_PER_HOUR } from "@/common/common";
import useSWR from "swr";
import SwiperGrid from "../shared/SwiperGrid";

interface menuType {
  id: number;
  title: string;
  action: string;
}
const ListMenu: menuType[] = [
  {
    id: 0,
    title: "Phim",
    action: "movie/upcoming",
  },
  {
    id: 1,
    title: "Tv Show",
    action: "tv/popular",
  },
];

const RecommendToday = () => {
  const [contentShow, setContentShow] = useState(0);
  const { data, error } = useSWR(`/${ListMenu[contentShow].action}`, {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  const handleSelectContent = useCallback((item: menuType) => {
    setContentShow(item.id);
  }, []);

  if (!data) return <p className="h-[500px]">Loading</p>;
  const listData = data.results;
  return (
    <div className="container">
      <Heading>Xem gì hôm nay</Heading>
      <MenuRecommend
        handleSelectContent={handleSelectContent}
        contentShow={contentShow}
      />
      <div className="relative text-red-400 recommend">
        <SwiperGrid data={listData} />
      </div>
      <div>
        <div className="relative slide-recommend"></div>
      </div>
    </div>
  );
};

interface MenuRecommendProps {
  handleSelectContent: (item: menuType) => void;
  contentShow: number;
}
const MenuRecommend = ({
  handleSelectContent,
  contentShow,
}: MenuRecommendProps) => {
  return (
    <div className="flex justify-end my-3 gap-x-2 item-center">
      {ListMenu.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            handleSelectContent(item);
          }}
          className={`text-lg ${
            item.id == contentShow ? "text-red-500" : ""
          } transition-all cursor-pointer`}
        >
          {item.title}
          <motion.div
            className={`${
              item.id === contentShow ? "h-1 underline bg-red-400" : ""
            }  `}
            layoutId="underline"
          />
        </div>
      ))}
    </div>
  );
};

export default RecommendToday;
