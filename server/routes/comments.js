import express from "express";
import { MongoClient } from "mongodb";

import db from "../config/db.js";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
  try {
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const comments = database.collection(db.mongoDB.commentsCollection);

    const cursor = comments.find({});
    const values = await cursor.toArray();
    res.status(200).send(values);
  } catch (error) {
    res.status(500).send("DB failure");
  }
});

export { commentsRouter };
