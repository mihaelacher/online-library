import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import mime from "mime-types";

import { checkJwt } from "../middleware/auth.middleware.js";
import storeFile from "../libs/s3ClientLibrary.js";
import { updateBookFiles, validateBook } from "../utils/bookUtil.js";
import cpUpload from "../libs/multerBookLibrary.js";
import config from "../config/config.js";
import db from "../config/db.js";

const bookRouter = express.Router();

bookRouter.use(checkJwt);

bookRouter.get("/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const books = database.collection(db.mongoDB.booksCollection);
    const book = await books.findOne({ _id: new ObjectId(bookId) });

    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send("Book not found!");
    }
  } catch (err) {
    res.status(500).send("Internal server error!");
  }
});

bookRouter.post("/", cpUpload, async (req, res) => {
  try {
    const book = req.body;
    const validationErrors = validateBook(book);
    if (validationErrors.length) {
      return res.status(400).send(validationErrors);
    }

    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const books = database.collection(db.mongoDB.booksCollection);
    const files = req.files;
    const coverImage = files?.cover_image[0];
    const bookPDF = files?.book_pdf[0];
    let insertedId;

    await books
      .insertOne(book)
      .then((result) => {
        insertedId = result.insertedId.toString();
        storeFile(
          coverImage,
          insertedId,
          db.s3Buckets.bookImages,
          "image/png" // TODO: generate dynamic content type, must not be only png
        );
        storeFile(
          bookPDF,
          insertedId,
          db.s3Buckets.bookFiles,
          "application/pdf"
        );
      })
      .catch((err) => {
        res.status(500).send("Internal Server Error");
      });

    updateBookFiles(books, insertedId, coverImage.mimetype, bookPDF.mimetype);

    res
      .status(200)
      .send(await books.findOne({ _id: new ObjectId(insertedId) }));
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

bookRouter.post("/:bookId", cpUpload, async (req, res) => {
  try {
    let book = req.body;

    const validationErrors = validateBook(book);
    if (validationErrors.length) {
      return res.status(400).send({ errors: validationErrors.join(",") });
    }

    const bookId = req.params.bookId;
    const dbClient = new MongoClient(db.mongoDB.connectionString);
    const database = dbClient.db(db.mongoDB.dbName);
    const books = database.collection(db.mongoDB.booksCollection);
    const files = req.files;
    const coverImage = files.cover_image[0];
    const bookPDF = files.book_pdf[0];

    const fileURLs = {
      cover_url: `${config.cloudfrontBaseUrl}${bookId}.${mime.extension(
        coverImage.mimetype
      )}`,
      book_pdf: `${config.s3BucketFilesBaseUrl}${bookId}.${mime.extension(
        bookPDF.mimetype
      )}`,
    };
    book = { ...book, ...fileURLs };
    delete book.id;
    delete book._id;

    books
      .updateOne(
        { _id: new ObjectId(bookId) },
        {
          $set: {
            ...book,
          },
        }
      )
      .catch((err) => {
        res.status(500).send("Internal Server Error");
      });

    // TODO: generate dynamic content type, must not be only png
    storeFile(coverImage, bookId, db.s3Buckets.bookImages, "image/png");
    storeFile(bookPDF, bookId, db.s3Buckets.bookFiles, "application/pdf");

    res.status(200).send(await books.findOne({ _id: new ObjectId(bookId) }));
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

export { bookRouter };
