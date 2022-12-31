import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import ReactPlayer from "react-player";
import MainLayout from "../../../components/layouts/MainLayout";

const DetailPage = () => {
  const router = useRouter();
  const { params } = router.query;
  if (!params) return null;
  //   useEffect(() => {
  //     const data = axios.get("https://2embed.org/embed/movie?tmdb=76600");
  //     console.log(data);
  //   }, []);
  return (
    <div>
      <iframe src={`https://2embed.org/embed/movie?tmdb=${params}`}></iframe>
    </div>
  );
};
DetailPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
export default DetailPage;
