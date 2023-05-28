import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainNavBar({ windowLocation, setWindowLocation }) {
  return (
    <>
      <li
        className={`${windowLocation.endsWith("3000/") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/"}>
          <FontAwesomeIcon className="nav-icon" icon="fa-solid fa-house" />
          <span className="li-text">Начало</span>
        </Link>
      </li>
      <li
        className={`${windowLocation.endsWith("/books") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/books"}>
          <FontAwesomeIcon
            className="nav-icon"
            icon="fa-solid fa-magnifying-glass"
          />
          <span className="li-text">Търси</span>
        </Link>
      </li>
    </>
  );
}

export default MainNavBar;
