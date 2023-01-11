import React, { FC } from "react";

interface HeadingProps {
  children: string;
  className?: string;
}

const Heading: FC<HeadingProps> = ({ children, className }) => {
  return <h1 className={`my-5 text-3xl font-bold ${className}`}>{children}</h1>;
};

export default Heading;
