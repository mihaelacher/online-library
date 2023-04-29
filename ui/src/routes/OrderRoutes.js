import { Route } from "react-router-dom";

import OrderLayout from "../layouts/OrderLayout";
import Checkout from "../components/cart/Checkout";
import OrderStatus from "../components/cart/OrderStatus";

const OrderRoutes = (
  <Route path="/payment" element={<OrderLayout />}>
    <Route index element={<Checkout />} />
    <Route path="status" element={<OrderStatus />} />
  </Route>
);

export default OrderRoutes;
