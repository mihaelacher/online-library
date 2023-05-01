import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function AuthNavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <>
        <Link to={"/profile"}>Профил</Link>
        <Link to={"/mybooks"}>Моите книги</Link>
      </>
    )
  );
}

export default AuthNavBar;
