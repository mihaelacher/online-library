import express from "express";
import { MongoClient } from "mongodb";

import db from "../config/db.js";

const ratingsRouter = express.Router();

ratingsRouter.get("/", async (req, res) => {
  try {
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const ratings = database.collection(db.mongoDB.ratingsCollection);

    const cursor = ratings.find({});
    const values = await cursor.toArray();
    res.status(200).send(values);
  } catch (error) {
    res.status(500).send("DB failure");
  }
});

export { ratingsRouter };
