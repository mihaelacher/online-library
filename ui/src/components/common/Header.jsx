import React from "react";

import { AuthenticationButton } from "../auth/AuthenticationButton";
import { ConnectedSearchBar } from "./SearchBar";
import CartButton from "../cart/CartButton";
import "./Header.css";

function Header() {
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
                    <CartButton />
                    <AuthenticationButton />
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
