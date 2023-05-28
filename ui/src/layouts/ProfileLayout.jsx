import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";

function ProfileLayout() {
  return (
    <>
      <SideBar />
      <div className="home-layout">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default ProfileLayout;
