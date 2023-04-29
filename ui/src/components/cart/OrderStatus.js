import React from "react";
import PaymentStatus from "./PaymentStatus";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MxQsFBxSXAlYxRDIFIvyUMqRYgpwT1swTlouMqdh1A3nn3LIIUxdyCVJpHcl5nvUg0Ldw5poq2R1MGhgPsPcc2A007osXj8ca"
);

const OrderStatus = () => {
  // const { clientSecret, message } = PaymentStatus();

  return (
    <Elements stripe={stripePromise}>
      <PaymentStatus />
    </Elements>
  );
};

export default OrderStatus;
