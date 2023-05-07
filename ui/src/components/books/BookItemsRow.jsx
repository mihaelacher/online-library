import React from "react";

import BookItem from "./BookItem";
import "./BookItemsRow.css";

function BookItemsRow({ books, genre, selectedGenre }) {
  return (
    <div className={`tab-content ${selectedGenre === genre ? "" : "hidden"}`}>
      <div className={selectedGenre === genre ? "active" : ""}>
        <div className="row">
          {books.map(function (book, i) {
            return <BookItem book={book} key={i}></BookItem>;
          })}
        </div>
      </div>
    </div>
  );
}

export default BookItemsRow;
