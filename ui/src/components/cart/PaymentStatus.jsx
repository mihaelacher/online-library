import { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const { items, emptyCart } = useCart();
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            const bookIds = items.map(({ id }) => id);
            try {
              const token = await getAccessTokenSilently();
              await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/order/complete`,
                {
                  username: user.nickname,
                  bookIds: bookIds,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setMessage("Успешно плащане!");
              emptyCart();
            } catch (error) {
              // Issue a refund using axios
              axios
                .post(`${process.env.REACT_APP_SERVER_URL}/order/refund`, {
                  paymentIntentId: paymentIntent.id,
                  amount: paymentIntent.amount,
                })
                .then(() => {
                  setMessage(
                    "Грешка при завършване на поръчката! Сумата е възстановена."
                  );
                })
                .catch(() => {
                  setMessage(
                    "Грешка при завършване на поръчката! Неуспешно възстановяване на сумата."
                  );
                });
            }
            break;

          case "processing":
            setMessage(
              "Плащането е в процес на обработка. Ще ви информираме, като приключи."
            );
            break;

          case "requires_payment_method":
            setMessage(
              "Плащането се провали. Моля, изберете друг метод на плащане!"
            );
            break;

          default:
            setMessage("Нещо се обърка.");
            break;
        }
      });
  });

  return message;
};

export default PaymentStatus;
