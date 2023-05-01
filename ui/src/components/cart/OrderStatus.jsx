import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

import PaymentStatus from "./PaymentStatus";
import getStripe from "../../libs/getStripe";

const OrderStatus = () => {
  return (
    <Elements stripe={getStripe()}>
      <PaymentStatus />
      <button>
        <Link to={"/"}>Начало</Link>
      </button>
    </Elements>
  );
};

export default OrderStatus;
