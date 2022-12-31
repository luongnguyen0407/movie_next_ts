import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { ReactElement } from "react";

const AboutPage = () => {
  return <div>hello</div>;
};
AboutPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default AboutPage;
