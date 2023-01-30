import { Genres } from "@/common/common";
import Link from "next/link";
import { FC } from "react";
import Heading from "../shared/Heading";
import Character from "./Character";
interface DetailContent {
  videoView: React.RefObject<HTMLHeadingElement>;
  id: string | number;
  seasonNumber?: number;
  episodeActive?: number;
  movie?: boolean;
  type: string;
  genres: Genres[];
}
const DetailContent: FC<DetailContent> = ({
  videoView,
  id,
  seasonNumber,
  episodeActive,
  movie,
  type,
  genres,
}) => {
  const iframeUrl = movie
    ? `/movie?tmdb=${id}`
    : `/series?tmdb=${id}&s=${seasonNumber}&e=${episodeActive}`;
  return (
    <>
      <div>
        <div className="flex sm:block">
          <p>Thể Loại: </p>
          <>
            {genres.map((genre) => (
              <Link href={`/category/${genre.id}`} key={genre.id}>
                {genre.name + " "}
              </Link>
            ))}
          </>
        </div>
      </div>
      <div className="flex flex-col mt-3 md:items-center md:flex-row gap-x-3">
        <div className="md:w-1/5">
          <div className="mt-5">
            <Heading className="text-xl">Diễn viên</Heading>
            <Character type={type} idMovie={id} />
          </div>
        </div>
        <div className="mt-4 sm:flex-1 sm:mt-0" ref={videoView}>
          <iframe
            className="w-full h-[500px]"
            allowFullScreen
            src={`https://2embed.org/embed${iframeUrl}`}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default DetailContent;
