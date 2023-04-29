import express from "express";
import { MongoClient } from "mongodb";

import db from "../config/db.js";

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  try {
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const books = database.collection(db.mongoDB.booksCollection);
    let query = {};

    const searchText = req.query.searchText;
    if (searchText) {
      query["$or"] = [
        { title: new RegExp(searchText) },
        { author: new RegExp(searchText) },
      ];
    }

    const genres = req.query.genres;
    if (genres) {
      query["genre"] = { $in: genres.split(",") };
    }

    const projection = {
      book_pdf: 0,
      book_pdf_url: 0,
    };

    const cursor = books.find(query).project(projection);

    const values = await cursor.toArray();
    res.send(values);
  } finally {
    // await client.close();
  }
});

export { booksRouter };
