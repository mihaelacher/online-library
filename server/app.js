import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { booksRouter } from "./routes/books.js";
import { bookRouter } from "./routes/book.js";
import { paymentRouter } from "./routes/payment.js";

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
app.use("/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
