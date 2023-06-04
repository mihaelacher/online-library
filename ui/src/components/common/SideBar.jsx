import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import MainNavBar from "./MainNavBar";
import AuthNavBar from "./AuthNavBar";
import "./Header.css";

function SideBar() {
  const { isAuthenticated, user } = useAuth0();
  const [windowLocation, setWindowLocation] = useState("/");
  const [isMouseInside, _setIsMouseInside] = useState(false);

  useEffect(() => {
    setWindowLocation(window.location.href);
  }, [window.location.href]);

  const mouseEnter = () => {
    setIsMouseInside(true);
  };
  const mouseLeave = () => {
    setIsMouseInside(false);
  };

  const setIsMouseInside = (isMouseInsideValue) => {
    const navText = document.querySelectorAll(".li-text");
    const sideBar = document.getElementById("sidebar");
    const homeLayout = document.getElementById("home-layout");

    if (!isMouseInsideValue) {
      navText.forEach((element) => {
        element.style.display = "none";
      });
      sideBar.style.width = "6%";
      homeLayout.style.width = "94%";
    } else {
      navText.forEach((element) => {
        element.style.display = "inline";
      });
      sideBar.style.width = "15%";
      homeLayout.style.width = "85%";
    }
    _setIsMouseInside(isMouseInsideValue);
  };

  return (
    <aside
      id="sidebar"
      className="sidebar"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="side-inner">
        <div class="company-brand">
          <img
            style={{ marginBottom: "20px" }}
            src="/images/logo_transparent.png"
            alt="logo"
            class="footer-logo"
          />
        </div>
        <div className="nav-menu">
          <ul>
            <MainNavBar
              windowLocation={windowLocation}
              setWindowLocation={setWindowLocation}
            />
            {isAuthenticated && (
              <AuthNavBar
                user={user}
                windowLocation={windowLocation}
                setWindowLocation={setWindowLocation}
              />
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
