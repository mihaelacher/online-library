import React from "react";

import { ConnectedBookItemsCarousel } from "../books/BookItemsCarousel";
import { ConnectedSearchBar } from "../common/SearchBar";

function HomePage() {
  return (
    <>
      <ConnectedSearchBar />
      <ConnectedBookItemsCarousel />
    </>
  );
}

export default HomePage;
