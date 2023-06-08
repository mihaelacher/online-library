import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCart } from "react-use-cart";

import CartModal from "./CartModal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c5a992",
    },
  },
});

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { items } = useCart();

  return (
    <ThemeProvider theme={theme}>
      <Badge
        badgeContent={items?.length ?? 0}
        color="primary"
        style={{ marginRight: "10px", cursor: "pointer" }}
        sx={{
          "& .MuiBadge-badge": {
            color: "#fff",
          },
        }}
        onClick={handleOpen}
      >
        <Tooltip title="Количка" placement="bottom">
          <ShoppingCartIcon />
        </Tooltip>
      </Badge>
      <CartModal open={open} handleClose={handleClose} />
    </ThemeProvider>
  );
};

export default CartButton;
