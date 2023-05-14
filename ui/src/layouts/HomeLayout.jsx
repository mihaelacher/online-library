import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/common/Header";
import { store } from "../store/index";
import { fetchUsers } from "../store/mutations/userMutations";
import Footer from "../components/common/Footer";

function HomeLayout() {
  const { user } = useAuth0();

  useEffect(() => {
    store.dispatch(fetchUsers(user));
  }, [user]);

  return (
    <div className="home-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
