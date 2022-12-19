import { useRouter } from "next/router";
import React from "react";

const SlugPage = () => {
  const router = useRouter();
  return <div>{JSON.stringify(router.query)}</div>;
};

export default SlugPage;
