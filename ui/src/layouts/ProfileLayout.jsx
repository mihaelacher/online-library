import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";

function ProfileLayout() {
  return (
    <div className="home-layout">
      <Header />
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
