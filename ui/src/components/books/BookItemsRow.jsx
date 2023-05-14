import React from "react";

import BookItem from "./BookItem";
import "./BookItemsRow.css";

function BookItemsRow({ books, isActive }) {
  return (
    <div className={`tab-content ${isActive ? "" : "hidden"}`}>
      <div className={isActive ? "active" : ""}>
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
