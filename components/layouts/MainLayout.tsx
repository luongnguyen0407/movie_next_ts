import React from "react";
import { LayoutProps } from "../../common/common";
import Header from "../partials/Header";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="overflow-hidden">
      <Header></Header>
      <section>{children}</section>
    </div>
  );
};

export default MainLayout;
