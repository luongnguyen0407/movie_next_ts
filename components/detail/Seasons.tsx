import { seasons } from "@/common/tv";
import React, { FC } from "react";
import { motion } from "framer-motion";
interface SeasonsItemProps {
  name: string | number;
  active?: boolean;
  onlClick?: React.MouseEventHandler<HTMLDivElement>;
}
interface SeasonsProps {
  data: seasons[];
  seasonActive: number;
  episodeActive: number;
  setSeasonActive: React.Dispatch<React.SetStateAction<number>>;
  setEpisodeActive: React.Dispatch<React.SetStateAction<number>>;
}
const Seasons: FC<SeasonsProps> = ({
  data,
  seasonActive,
  setSeasonActive,
  episodeActive,
  setEpisodeActive,
}) => {
  const handleSelectSeason = (index: number) => {
    if (index == seasonActive) return;
    setSeasonActive(index);
  };
  return (
    <div className="my-5">
      <div className="flex flex-wrap items-center justify-center pr-4 sm:justify-start gap-x-3">
        {data.map((seasonItem, index) => (
          <SeasonsItem
            key={seasonItem.id}
            name={`Mùa ${index + 1}`}
            active={seasonActive == index}
            onlClick={() => handleSelectSeason(index)}
          />
        ))}
      </div>
      <div className="my-3">Tập</div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
        {new Array(data[seasonActive].episode_count).fill(0).map((i, index) => (
          <SeasonsItem
            key={index}
            name={index + 1}
            active={episodeActive == index + 1}
            onlClick={() => setEpisodeActive(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

const SeasonsItem = ({ name, active, onlClick }: SeasonsItemProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onlClick}
      className={`inline-block px-2 py-1 text-white border rounded-sm cursor-pointer  ${
        active ? "border-active" : "border-gray-300"
      } `}
    >
      {name}
    </motion.div>
  );
};

export default Seasons;
