import React from "react";
import { Link } from "react-router-dom";

function MainNavBar({ windowLocation, setWindowLocation }) {
  return (
    <>
      <li
        onClick={() => setWindowLocation(window.location.href)}
        className={`menu-item ${
          windowLocation.endsWith("3000/") ? "active" : ""
        }`}
      >
        <Link to={"/"}>Начало</Link>
      </li>
      <li
        onClick={() => setWindowLocation(window.location.href)}
        className={`menu-item ${
          windowLocation.endsWith("/books") ? "active" : ""
        }`}
      >
        <Link to={"/books"}>Търси</Link>
      </li>
    </>
  );
}

export default MainNavBar;
