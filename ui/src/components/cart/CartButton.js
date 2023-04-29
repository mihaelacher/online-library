import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CartModal from "./CartModal";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className="btn btn-tertiary btn-block btn-round"
      onClick={() => setIsOpen(true)}
    >
      <i>
        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
      </i>
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </button>
  );
};

export default CartButton;
