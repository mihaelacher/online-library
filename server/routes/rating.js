import express from "express";
import { MongoClient, ObjectId } from "mongodb";

import { checkJwt } from "../middleware/auth.middleware.js";
import db from "../config/db.js";

const ratingRouter = express.Router();

ratingRouter.use(checkJwt);

ratingRouter.post("/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const value = req.body.value;
    const timestamp = req.body.timestamp;
    const username = req.body.username;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const ratings = database.collection(db.mongoDB.ratingsCollection);
    const rating = await ratings.findOne({
      username: username,
      bookId: bookId,
    });

    if (rating) {
      ratings
        .updateOne(
          { _id: new ObjectId(rating._id) },
          {
            $set: {
              value: value,
            },
          }
        )
        .catch((err) => {
          return res.status(500).send("Internal Server Error");
        });
    } else {
      ratings
        .insertOne({
          username: username,
          bookId: bookId,
          value: value,
          timestamp: timestamp,
        })
        .catch((err) => {
          console.log(err); //debug
          return res.status(500).send("Internal Server Error");
        });
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).send("Internal server error");
  }
});

export { ratingRouter };
