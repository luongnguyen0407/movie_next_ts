import React from "react";

const Heading = ({ children }: { children: string }) => {
  return <h1 className="my-5 text-3xl font-bold">{children}</h1>;
};

export default Heading;
