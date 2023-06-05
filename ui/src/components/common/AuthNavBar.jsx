import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AuthNavBar({ user, windowLocation, setWindowLocation }) {
  return (
    <>
      <li
        className={`${windowLocation.endsWith("/reels") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/reels"}>
          <FontAwesomeIcon
            className="nav-icon"
            icon="fa-solid fa-people-line"
          />
          <span className="li-text">Актуално</span>
        </Link>
      </li>
      <li
        className={`${windowLocation.endsWith("/favorites") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/favorites"}>
          <FontAwesomeIcon className="nav-icon" icon="fa-solid fa-heart" />
          <span className="li-text">Любими</span>
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
        className={`${windowLocation.endsWith("/profile") ? "active" : ""}`}
        onClick={() => setWindowLocation(window.location.href)}
      >
        <Link to={"/profile"}>
          <img
            style={{
              borderRadius: "50%",
              maxWidth: "42px",
              marginRight: "5px",
            }}
            src={user.picture}
            alt="profile-pic"
          />
          <span className="li-text">Профил</span>
        </Link>
      </li>
    </>
  );
}

export default AuthNavBar;
