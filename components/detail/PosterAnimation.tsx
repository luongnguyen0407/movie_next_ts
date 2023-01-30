import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageMotion from "../shared/ImageMotion";

const PosterAnimation = ({ src }: { src: string }) => {
  return (
    <div className="w-[200px] h-[300px] relative z-10 -mt-20">
      {/* <motion.div
        initial={{ scale: "50%" }}
        animate={{ scale: "100%" }}
        transition={{ delay: 0.2, type: "spring", stiffness: 20 }}
      > */}
      <ImageMotion
        src={`https://image.tmdb.org/t/p/w500${src}`}
        // width={200}
        alt="movie"
        // height={300}
        priority
        fill
        className="rounded-sm "
        containerclassname="relative h-full "
      />
      {/* </motion.div> */}
    </div>
  );
};

export default PosterAnimation;
