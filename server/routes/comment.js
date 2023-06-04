import express from "express";
import { MongoClient, ObjectId } from "mongodb";

import { checkJwt } from "../middleware/auth.middleware.js";
import db from "../config/db.js";

const commentRouter = express.Router();

commentRouter.use(checkJwt);

commentRouter.post("/:username", async (req, res) => {
  try {
    const bookId = req.body.bookId;
    const commentText = req.body.commentText;
    const timestamp = req.body.timestamp;
    const user = req.params.username;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const comments = database.collection(db.mongoDB.commentsCollection);

    comments
      .insertOne({
        username: user,
        bookId: bookId,
        comment: commentText,
        timestamp: timestamp,
        likes: [],
        dislikes: [],
      })
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    return res.status(200).send("OK");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).send("Internal server error");
  }
});

commentRouter.post("/like/:commentId", async (req, res) => {
  try {
    const username = req.body.username;
    const commentId = req.params.commentId;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const comments = database.collection(db.mongoDB.commentsCollection);

    comments
      .updateOne(
        { _id: new ObjectId(commentId) },
        {
          $push: { likes: username },
        }
      )
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    return res.status(200).send("OK");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).send("Internal server error");
  }
});

commentRouter.post("/unlike/:commentId", async (req, res) => {
  try {
    const username = req.body.username;
    const commentId = req.params.commentId;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const comments = database.collection(db.mongoDB.commentsCollection);

    comments
      .updateOne(
        { _id: new ObjectId(commentId) },
        {
          $pull: { likes: username },
        }
      )
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    return res.status(200).send("OK");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).send("Internal server error");
  }
});

commentRouter.post("/dislike/:commentId", async (req, res) => {
  try {
    const username = req.body.username;
    const commentId = req.params.commentId;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const comments = database.collection(db.mongoDB.commentsCollection);

    comments
      .updateOne(
        { _id: new ObjectId(commentId) },
        {
          $push: { dislikes: username },
        }
      )
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    return res.status(200).send("OK");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).send("Internal server error");
  }
});

commentRouter.post("/undislike/:commentId", async (req, res) => {
  try {
    const username = req.body.username;
    const commentId = req.params.commentId;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const comments = database.collection(db.mongoDB.commentsCollection);

    comments
      .updateOne(
        { _id: new ObjectId(commentId) },
        {
          $pull: { dislikes: username },
        }
      )
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    return res.status(200).send("OK");
  } catch (err) {
    console.log(err); //debug
    return res.status(500).send("Internal server error");
  }
});

export { commentRouter };
