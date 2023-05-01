import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Logo from "../components/common/Logo";

function ProfileLayout() {
  return (
    <div className="home-layout">
      <Header />
      <Logo />
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
