import { MILLISECOND_PER_HOUR } from "@/common/common";
import React from "react";
import CastItem from "./CastItem";
import useSWR from "swr";
import { ActorTV } from "@/common/tv";

interface CharacterProps {
  idMovie: string | number;
  type: string;
}
const Character = ({ idMovie, type }: CharacterProps) => {
  if (!idMovie) return null;
  const { data, error } = useSWR(`/${type}/${idMovie}/credits`, {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  if (!data) return null;
  return (
    <div className="max-h-[400px] md:overflow-y-scroll overflow-x-scroll md:overflow-x-auto no-scrollbar  cursor-pointer transition-all flex gap-x-3 md:block">
      {data &&
        data.cast.map((actor: ActorTV) => (
          <CastItem
            key={actor.id}
            name={actor.name}
            srcImg={actor.profile_path}
            character={actor.character}
          />
        ))}
    </div>
  );
};

export default Character;
