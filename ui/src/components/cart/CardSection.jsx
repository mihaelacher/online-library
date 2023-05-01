import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CardSection = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_HOST_URL}payment/status`,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-section">
        <PaymentElement />
        <button disabled={!stripe}>Submit</button>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </form>
  );
};

export default CardSection;
