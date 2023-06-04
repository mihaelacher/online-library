import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { booksRouter } from "./routes/books.js";
import { bookRouter } from "./routes/book.js";
import { usersRouter } from "./routes/users.js";
import { orderRouter } from "./routes/order.js";
import { userRouter } from "./routes/user.js";
import { commentRouter } from "./routes/comment.js";
import { commentsRouter } from "./routes/comments.js";
import { ratingRouter } from "./routes/rating.js";
import { ratingsRouter } from "./routes/ratings.js";

var app = express();

// To support JSON-encoded bodies.
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use("/books", booksRouter);
app.use("/book", bookRouter);
app.use("/users", usersRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/comment", commentRouter);
app.use("/comments", commentsRouter);
app.use("/rating", ratingRouter);
app.use("/ratings", ratingsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
