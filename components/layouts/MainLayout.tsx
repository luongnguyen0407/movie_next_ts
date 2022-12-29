import React from "react";
import { LayoutProps } from "../../common/common";
import Header from "../partials/Header";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};

export default MainLayout;
