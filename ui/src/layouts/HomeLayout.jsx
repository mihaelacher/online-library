import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SideBar from "../components/common/SideBar";
import { store } from "../store/index";
import { fetchUsers } from "../store/mutations/userMutations";
import { fetchComments } from "../store/mutations/commentMutations";
import { fetchRatings } from "../store/mutations/ratingMutations";

function HomeLayout() {
  const { user } = useAuth0();

  useEffect(() => {
    store.dispatch(fetchUsers(user));
    store.dispatch(fetchComments());
  }, [user]);

  return (
    <>
      <SideBar />
      <div id="home-layout" className="home-layout">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;
