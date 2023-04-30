import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/common/Header";
import Logo from "../components/common/Logo";
import { store } from "../store/index";
import { fetchBooks } from "../store/mutations/bookMutations";
import { fetchUsers } from "../store/mutations/userMutations";

function HomeLayout() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetchData();
  }, [user]);

  async function fetchData() {
    store.dispatch(fetchBooks(user?.email));
    console.log(isAuthenticated, user);
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      store.dispatch(fetchUsers(token));
    }
  }

  return (
    <div className="home-layout">
      <Header />
      <Logo />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
