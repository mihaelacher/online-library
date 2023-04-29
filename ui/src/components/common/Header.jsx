import React from "react";

import { AuthenticationButton } from "../auth/AuthenticationButton";
import CartButton from "../cart/CartButton";
import MainNavBar from "./MainNavBar";
import AuthNavBar from "./AuthNavBar";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="header-section-top">
        <div className="row">
          <div className="col-sm-12">
            <div className="custom-menu">
              <ul>
                <li>
                  <MainNavBar />
                  <AuthNavBar />
                </li>
              </ul>
              <CartButton />
              <AuthenticationButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
