import React from "react";

import logo from "./logo_50.webp";
import "./Logo.css";

function Logo() {
  return (
    <div className="logo-section">
      <div className="logo">
        <img src={logo} alt="logo" />
        <p>Онлайн Библиотека</p>
      </div>
    </div>
  );
}

export default Logo;
