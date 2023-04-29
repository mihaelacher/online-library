import React from "react";

import BookItem from "./BookItem";
import "./BookItemsRow.css";

function BookItemsRow({ books, genre }) {
  return (
    <div className="container">
      <h1 className="headline">{genre}</h1>
      <div className="row">
        {books.map(function (book, i) {
          return <BookItem book={book} key={i}></BookItem>;
        })}
      </div>
    </div>
  );
}

export default BookItemsRow;
