import express from "express";
import Stripe from "stripe";

import { checkJwt } from "../middleware/auth.middleware.js";

const paymentRouter = express.Router();

//paymentRouter.use(checkJwt);

paymentRouter.get("/", async function (req, res) {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000.0, // for test purposes
    currency: "bgn",
    // automatic_payment_methods: { enabled: true },
  });

  return res.json({ client_secret: paymentIntent.client_secret });
});

export { paymentRouter };
