import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CardSection from "./CardSection";

const stripePromise = loadStripe(
  "pk_test_51MxQsFBxSXAlYxRDIFIvyUMqRYgpwT1swTlouMqdh1A3nn3LIIUxdyCVJpHcl5nvUg0Ldw5poq2R1MGhgPsPcc2A007osXj8ca"
);

export default function CheckoutForm() {
  // const { data, isLoading } = useFetchData(
  //   `${process.env.REACT_APP_SERVER_URL}/payment`
  // );
  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret: data?.client_secret,
  //   appearance: appearance,
  // };
  // return (
  //   !isLoading && (
  //     <Elements stripe={stripePromise} options={options}>
  //       <CardSection />
  //     </Elements>
  //   )
  // );
}
