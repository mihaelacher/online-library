import { Elements } from "@stripe/react-stripe-js";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import CardSection from "./CardSection";
import useFetchData from "../../hooks/useFetchData";
import getStripe from "../../libs/getStripe";
import Loading from "../common/Loading";

export function CheckoutForm() {
  const { data, isLoading } = useFetchData(
    `${process.env.REACT_APP_SERVER_URL}/order/payment`
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

export default withAuthenticationRequired(CheckoutForm, {
  onRedirecting: () => <Loading />,
});
