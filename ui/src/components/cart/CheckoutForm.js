import { Elements } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import useFetchData from "../../hooks/useFetchData";
import getStripe from "../../libs/getStripe";

export default function CheckoutForm() {
  const { data, isLoading } = useFetchData(
    `${process.env.REACT_APP_SERVER_URL}/payment`
  );
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: data?.client_secret,
    appearance: appearance,
  };
  return (
    !isLoading && (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Elements stripe={getStripe()} options={options}>
          <CardSection />
        </Elements>
      </div>
    )
  );
}
