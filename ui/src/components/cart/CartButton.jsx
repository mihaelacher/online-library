import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "react-use-cart";

import CartModal from "./CartModal";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  return (
    <>
      <Badge
        badgeContent={items.length}
        color="primary"
        style={{ marginRight: "10px", cursor: "pointer" }}
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCartIcon />
      </Badge>
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default CartButton;
