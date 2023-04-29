import express from "express";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

import { checkJwt } from "../middleware/auth.middleware.js";
import db from "../config/db.js";

const myBooksRouter = express.Router();

myBooksRouter.use(checkJwt);

myBooksRouter.get("/", async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const books = database.collection(db.mongoDB.booksCollection);
    const userEmail = decodedToken[`${process.env.AUTH0_AUDIENCE}/email`];

    if (
      !userEmail ||
      (!req.query?.providedBy && !req.query?.rentedBy) ||
      (req.query?.providedBy == 0 && req.query?.rentedBy == 0)
    ) {
      res.send([]);
      return;
    }

    let query = {};
    if (req.query?.providedBy == 1) {
      query["provider"] = userEmail;
    }

    if (req.query?.rentedBy == 1) {
      query["renters"] = userEmail;
    }

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

    const options = {
      sort: { title: 1 },
    };
    const cursor = books.find(query, options);
    // print a message if no documents were found
    // if ((await books.countDocuments(query)) === 0) {
    //   res.send("No books found!");
    // }

    const values = (await cursor.toArray()).map((data) => {
      return {
        id: data._id,
        ...data,
      };
    });

    res.send(values);
  } finally {
    // await client.close();
  }
});

export { myBooksRouter };
