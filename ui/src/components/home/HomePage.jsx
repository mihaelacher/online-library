import React from "react";
import { ConnectedBookGerneSection } from "../books/BookGenreSection";
import { ConnectedBookItemBestSeller } from "../books/BookItemBestSeller";

function HomeLayout() {
  return (
    <>
      <ConnectedBookItemBestSeller />
      <ConnectedBookGerneSection />
    </>
  );
}

export default HomeLayout;
