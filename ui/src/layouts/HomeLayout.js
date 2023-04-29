import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/common/Header";
import Logo from "../components/common/Logo";
import { store } from "../store/index";
import * as mutations from "../store/mutations";

function HomeLayout() {
  const { user } = useAuth0();
  store.dispatch(mutations.fetchBooks(user?.email));

  return (
    <div className="home-layout">
      <Header />
      <Logo />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
