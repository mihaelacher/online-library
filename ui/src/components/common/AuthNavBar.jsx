import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AuthNavBar({ windowLocation, setWindowLocation }) {
  return (
    <>
      <li
        className={`${windowLocation.endsWith("/profile") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/profile"}>
          <FontAwesomeIcon className="nav-icon" icon="fa-solid fa-user" />
          <span className="li-text">Профил</span>
        </Link>
      </li>
      <li
        className={`${windowLocation.endsWith("/chatbox") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/chatbox"}>
          <FontAwesomeIcon className="nav-icon" icon="fa-solid fa-comments" />
          <span className="li-text">Съобщения</span>
        </Link>
      </li>
      <li
        className={`${windowLocation.endsWith("/mybooks") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/mybooks"}>
          <FontAwesomeIcon className="nav-icon" icon="fa-solid fa-book" />
          <span className="li-text">Моите книги</span>
        </Link>
      </li>
    </>
  );
}

export default AuthNavBar;
