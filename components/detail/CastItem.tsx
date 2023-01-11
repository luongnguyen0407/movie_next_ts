import Image from "next/image";
import { FC } from "react";

interface CastItemProps {
  srcImg: string;
  name: string;
  character: string;
}

const CastItem: FC<CastItemProps> = ({ srcImg, name, character }) => {
  return (
    <div className="flex items-center my-3 gap-x-2">
      <div className="relative w-10 h-10">
        <Image
          src={`https://image.tmdb.org/t/p/w500${srcImg}`}
          alt=""
          fill
          className="object-cover rounded-full"
        ></Image>
      </div>
      <div>
        <p className="text-lg text-active">{name}</p>
        <p className="text-sm text-slate-300">{character}</p>
      </div>
    </div>
  );
};

export default CastItem;
