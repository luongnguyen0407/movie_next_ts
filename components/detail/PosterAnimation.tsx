import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PosterAnimation = ({ src }: { src: string }) => {
  return (
    <>
      <motion.div
        initial={{ scale: "50%" }}
        animate={{ scale: "100%" }}
        transition={{ delay: 0.2, type: "spring", stiffness: 20 }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${src}`}
          alt=""
          width={200}
          height={300}
          className="relative z-10 -mt-20 rounded-sm"
        />
      </motion.div>
    </>
  );
};

export default PosterAnimation;
