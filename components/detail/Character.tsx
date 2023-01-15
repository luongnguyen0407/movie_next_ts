import { MILLISECOND_PER_HOUR } from "@/common/common";
import React from "react";
import CastItem from "./CastItem";
import useSWR from "swr";
import { ActorTV } from "@/common/tv";

const Character = ({ idMovie }: { idMovie: string | number }) => {
  if (!idMovie) return null;
  const { data, error } = useSWR(`/tv/${idMovie}/credits`, {
    revalidateOnFocus: false,
    dedupingInterval: MILLISECOND_PER_HOUR,
    revalidateIfStale: false,
  });
  if (!data) return null;
  return (
    <div className="max-h-[400px] hover:overflow-y-scroll overflow-hidden cursor-pointer transition-all">
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
