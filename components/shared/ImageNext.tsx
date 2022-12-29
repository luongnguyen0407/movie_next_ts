import Image from "next/image";
import React from "react";

interface ImageNextProps {
  src: string;
  alt: string;
  className?: string;
}
const ImageNext = ({ src, alt, className = "" }: ImageNextProps) => {
  return (
    <Image
      className={className}
      alt={alt}
      src={src}
      fill
      unoptimized
      priority
    />
  );
};

export default ImageNext;
