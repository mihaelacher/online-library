import express from "express";
import { MongoClient } from "mongodb";

import { checkJwt } from "../middleware/auth.middleware.js";
import db from "../config/db.js";

const userRouter = express.Router();

userRouter.use(checkJwt);

userRouter.post("/follow/:username", async (req, res) => {
  try {
    const follower = req.body.follower;
    const following = req.params.username;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const users = database.collection(db.mongoDB.usersCollection);

    users
      .updateOne(
        { username: following },
        {
          $push: { followers: follower },
        }
      )
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    users
      .updateOne(
        { username: follower },
        {
          $push: { following: following },
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

userRouter.post("/unfollow/:username", async (req, res) => {
  try {
    const follower = req.body.follower;
    const following = req.params.username;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const users = database.collection(db.mongoDB.usersCollection);

    users
      .updateOne(
        { username: following },
        {
          $pull: { followers: follower },
        }
      )
      .catch((err) => {
        console.log(err); //debug
        return res.status(500).send("Internal Server Error");
      });

    users
      .updateOne(
        { username: follower },
        {
          $pull: { following: following },
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

userRouter.post("/addToFavorites/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const username = req.body.username;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const users = database.collection(db.mongoDB.usersCollection);

    users
      .updateOne(
        { username: username },
        {
          $push: { favorites: bookId },
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

userRouter.post("/removeFromFavorites/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const username = req.body.username;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const users = database.collection(db.mongoDB.usersCollection);

    users
      .updateOne(
        { username: username },
        {
          $pull: { favorites: bookId },
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

export { userRouter };
