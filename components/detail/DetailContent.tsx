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
    <div className="flex items-center mt-3 gap-x-3">
      <div className="w-1/5 ">
        <div>
          <p>Thể Loại :</p>
          <>
            {genres.map((genre) => (
              <Link href={`/category/${genre.id}`} key={genre.id}>
                {genre.name + " "}
              </Link>
            ))}
          </>
        </div>
        <div className="mt-5">
          <Heading className="text-xl">Cast</Heading>
          <Character type={type} idMovie={id} />
        </div>
      </div>
      <div className="flex-1" ref={videoView}>
        <iframe
          className="w-full h-[500px]"
          allowFullScreen
          src={`https://2embed.org/embed${iframeUrl}`}
        ></iframe>
      </div>
    </div>
  );
};

export default DetailContent;
