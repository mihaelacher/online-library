import express from "express";
import { MongoClient } from "mongodb";

import { checkJwt } from "../middleware/auth.middleware.js";
import db from "../config/db.js";

const usersRouter = express.Router();

usersRouter.use(checkJwt);

usersRouter.get("/", async (req, res) => {
  try {
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const users = database.collection(db.mongoDB.usersCollection);

    const cursor = users.find({});
    const values = await cursor.toArray();
    res.status(200).send(values);
  } catch (error) {
    res.status(500).send("DB failure");
  }
});

export { usersRouter };
