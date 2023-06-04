import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import Footer from "../components/common/Footer";
import { store } from "../store/index";
import { fetchUsers } from "../store/mutations/userMutations";
import { fetchRatings } from "../store/mutations/ratingMutations";
import { fetchComments } from "../store/mutations/commentMutations";

function ProfileLayout() {
  const { user } = useAuth0();
  useEffect(() => {
    store.dispatch(fetchUsers(user));
    store.dispatch(fetchComments());
    store.dispatch(fetchRatings());
  }, [user]);

  return (
    <>
      <SideBar />
      <Header />
      <div id="home-layout" className="home-layout">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default ProfileLayout;
