import express from "express";
import { MongoClient } from "mongodb";

import db from "../config/db.js";

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  try {
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const books = database.collection(db.mongoDB.booksCollection);

    const projection = {
      book_pdf: 0,
      cover_image: 0,
    };

    const cursor = books.find({}).project(projection);

    const values = await cursor.toArray();
    res.status(200).send(values);
  } catch (error) {
    res.status(500).send("DB failure");
  }
});

export { booksRouter };
