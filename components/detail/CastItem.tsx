import Image, { StaticImageData } from "next/image";
import { FC, useState } from "react";
import Actor from "/public/user.png";

interface CastItemProps {
  srcImg: string;
  name: string;
  character: string;
}

const CastItem: FC<CastItemProps> = ({ srcImg, name, character }) => {
  const [src, setSrc] = useState<string | StaticImageData>(
    `https://image.tmdb.org/t/p/w500${srcImg}`
  );
  return (
    <div className="flex flex-col items-center my-3 md:flex-row gap-x-2">
      <div className="relative w-10 h-10">
        <Image
          src={src}
          alt=""
          fill
          sizes="(
                    500px"
          className="object-cover rounded-full select-none"
          onError={() => setSrc(Actor)}
        ></Image>
      </div>
      <div className="hidden md:block">
        <p className="text-lg text-active">{name}</p>
        <p className="text-md text-slate-300 whitespace-nowrap max-w-[150px] overflow-hidden">
          {character}
        </p>
      </div>
    </div>
  );
};

export default CastItem;
