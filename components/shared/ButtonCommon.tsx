import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface ButtonCommonProps {
  icon?: boolean;
  children: string;
  className?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ButtonCommon = ({
  icon,
  children,
  className,
  onClick,
}: ButtonCommonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`mx-auto sm:mx-0 px-4 pt-2 pb-3 text-white bg-red-500 rounded-lg flex ${className} flex max-w-[133px] items-center justify-between cursor-pointer`}
    >
      <p>{children}</p>
      {icon && <PlayIcon className="w-5 h-5 mt-1"></PlayIcon>}
    </motion.div>
  );
};

export default ButtonCommon;
