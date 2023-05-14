import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ConnectedBookGerneSection } from "../books/BookGenreSection";
import { ConnectedBookItemBestSeller } from "../books/BookItemBestSeller";
import { ConnectedPromoBookSection } from "../books/PromoBooksSection";

function HomeLayout() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <ConnectedBookItemBestSeller />
      <ConnectedBookGerneSection />
      {isAuthenticated && <ConnectedPromoBookSection />}
    </>
  );
}

export default HomeLayout;
