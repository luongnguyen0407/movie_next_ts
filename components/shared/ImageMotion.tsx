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
    <>
      {!isLoaded && <ImageMotionLoading />}
      <motion.div
        initial="hidden"
        variants={variants}
        animate={isLoaded ? "visible" : "hidden"}
        className={`${containerclassname} ${!isLoaded ? "hidden" : ""}`}
      >
        <Image
          onLoadingComplete={handleLoadingComplete}
          // priority
          {...props}
          sizes="(max-width: 768px) 500px,
                (max-width: 1200px) 1000px,
                1080px"
        />
      </motion.div>
    </>
  );
};

const ImageMotionLoading = () => {
  return <div className="w-[176px] h-[245px] skeleton"></div>;
};
export default React.memo(ImageMotion);
