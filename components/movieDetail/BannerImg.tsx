import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bannerVariants } from "@/common/common";
import Image from "next/image";
import BannerMotion from "../shared/BannerMotion";

interface BannerImgProps {
  src: string;
  action?: React.Key | null | undefined;
  className?: string;
}

const BannerImg = ({
  src,
  action,
  className = "h-[460px]",
}: BannerImgProps) => {
  return (
    <motion.div
      variants={bannerVariants}
      animate="animate"
      exit="exit"
      initial="initial"
      className={`relative w-full overflow-hidden ${className}`}
      key={action}
    >
      <div className="absolute inset-0 z-30 flex flex-col justify-center hidden px-4 banner__overlay md:px-12 sm:block"></div>
      {/* <BannerMotion/> */}
      <BannerMotion
        src={src}
        alt="banner"
        fill
        sizes="100vw"
        priority
        className="object-cover banner__overlay"
      />
    </motion.div>
  );
};

export default BannerImg;
