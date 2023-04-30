import { Route } from "react-router-dom";

import OrderLayout from "../layouts/OrderLayout";
import OrderStatus from "../components/cart/OrderStatus";
import CheckoutForm from "../components/cart/CheckoutForm";

const OrderRoutes = (
  <Route path="/payment" element={<OrderLayout />}>
    <Route index element={<CheckoutForm />} />
    <Route path="status" element={<OrderStatus />} />
  </Route>
);

export default OrderRoutes;
