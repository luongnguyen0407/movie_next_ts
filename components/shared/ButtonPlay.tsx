import React from "react";
import { motion, Variants } from "framer-motion";
import { bannerVariants } from "@/common/common";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/24/solid";

interface ButtonPlayProps {
  variants?: Variants | undefined;
  action: React.Key | null | undefined;
  src: string;
  className?: string;
}
const ButtonPlay = ({ variants, action, src, className }: ButtonPlayProps) => {
  return (
    <>
      <motion.div
        variants={variants ?? bannerVariants}
        animate={`animate`}
        initial="initial"
        className={`absolute z-40 cursor-pointer ${className}`}
        key={action}
      >
        <Link
          href={`${src}`}
          passHref
          className="flex items-center justify-center p-4 border-2 border-white rounded-full"
        >
          <PlayIcon className="w-5 h-5" />
        </Link>
      </motion.div>
    </>
  );
};

export default ButtonPlay;
