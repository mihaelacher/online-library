import { Link } from "react-router-dom";
import React from "react";

function MainNavBar() {
  return (
    <>
      <Link to={"/"}>Начало</Link>
      <Link to={"/books"}>Търси</Link>
    </>
  );
}

export default MainNavBar;
