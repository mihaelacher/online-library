import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthenticationButton } from "../auth/AuthenticationButton";
import CartButton from "../cart/CartButton";
import MainNavBar from "./MainNavBar";
import AuthNavBar from "./AuthNavBar";
import "./Header.css";
import { ConnectedSearchBar } from "./SearchBar";

function Header() {
  const [windowLocation, setWindowLocation] = useState("/");

  useEffect(() => {
    setWindowLocation(window.location.href);
  }, [window.location.href]);

  return (
    <div id="header-wrap">
      <header id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ConnectedSearchBar />
            </div>
            <div className="col-md-9">
              <nav id="navbar">
                <div className="main-menu stellarnav">
                  <ul className="menu-list">
                    <MainNavBar
                      windowLocation={windowLocation}
                      setWindowLocation={setWindowLocation}
                    />
                    <AuthNavBar
                      windowLocation={windowLocation}
                      setWindowLocation={setWindowLocation}
                    />
                    <AuthenticationButton />
                    <CartButton />
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
