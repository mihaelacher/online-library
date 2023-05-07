import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function AuthNavBar({ windowLocation, setWindowLocation }) {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <>
        <li
          onClick={() => setWindowLocation(window.location.href)}
          className={`menu-item ${
            windowLocation.endsWith("/profile") ? "active" : ""
          }`}
        >
          <Link to={"/profile"}>Профил</Link>
        </li>
        <li
          onClick={() => setWindowLocation(window.location.href)}
          className={`menu-item ${
            windowLocation.endsWith("/mybooks") ? "active" : ""
          }`}
        >
          <Link to={"/mybooks"}>Моите книги</Link>
        </li>
      </>
    )
  );
}

export default AuthNavBar;
