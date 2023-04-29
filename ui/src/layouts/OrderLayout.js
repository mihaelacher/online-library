import React from "react";
import { Outlet } from "react-router-dom";

function OrderLayout() {
  return (
    <div className="order-layout">
      <Outlet />
    </div>
  );
}

export default OrderLayout;
