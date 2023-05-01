import express from "express";
import Stripe from "stripe";
import { MongoClient } from "mongodb";

import { checkJwt } from "../middleware/auth.middleware.js";
import db from "../config/db.js";

const orderRouter = express.Router();

orderRouter.use(checkJwt);

orderRouter.get("/payment", async function (req, res) {
  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000.0, // req.body.amount hardcoded for test purposes
      currency: "bgn",
    });

    return res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error); // for test purposes
    return res.status(500).send("Payment failed");
  }
});

orderRouter.post("/complete", async function (req, res) {
  const dbClient = new MongoClient(db.mongoDB.connectionString);
  const database = dbClient.db(db.mongoDB.dbName);
  const users = database.collection(db.mongoDB.usersCollection);
  const bookIds = req.body.bookIds;
  const username = req.body.username;

  users
    .updateOne(
      { username: username },
      {
        $push: {
          orders: {
            id: randomString(),
            bookIds: bookIds,
            date: Date.now(),
          },
        },
      }
    )
    .then(() => {
      return res.status(200).send("ok");
    })
    .catch((err) => {
      console.log(err); //debug
      return res.status(500).send("DB Error");
    });
});

orderRouter.post("/refund", async function (req, res) {
  const { paymentIntentId, amount } = req.body;
  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount,
    });
    res.status(200).json(refund);
  } catch (error) {
    console.error(error); // for test purposes
    res.status(500).json({ error: "Could not issue refund" });
  }
});

function randomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var randomstring = "";
  var string_length = 100;
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

export { orderRouter };
