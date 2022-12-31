import React, { useCallback, useState } from "react";
import Image, { ImageProps as NextImageProps } from "next/image";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },
};

interface ImageProps extends NextImageProps {
  containerclassname?: string;
}

const ImageMotion: React.FC<ImageProps> = ({
  onLoadingComplete,
  containerclassname,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingComplete: NextImageProps["onLoadingComplete"] =
    useCallback(
      (result: HTMLImageElement) => {
        setIsLoaded(true);
        onLoadingComplete?.(result);
      },
      [onLoadingComplete]
    );

  return (
    <motion.div
      initial="hidden"
      variants={variants}
      animate={isLoaded ? "visible" : "hidden"}
      className={containerclassname}
    >
      <Image
        onLoadingComplete={handleLoadingComplete}
        priority
        {...props}
        sizes="(max-width: 768px) 180px,
              (max-width: 1200px) 180px,
              180px"
      />
    </motion.div>
  );
};

export default React.memo(ImageMotion);
