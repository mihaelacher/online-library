import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { booksRouter } from "./routes/books.js";
import { bookRouter } from "./routes/book.js";
import { usersRouter } from "./routes/users.js";
import { orderRouter } from "./routes/order.js";
import { userRouter } from "./routes/user.js";

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
