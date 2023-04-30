import React, { useState } from "react";
import { useCart } from "react-use-cart";

import BookItemModal from "./BookItemModal";
import "./BookItem.css";

export const BookItem = ({ book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();

  return (
    <>
      <div className="col-lg-3" onClick={() => setIsOpen(true)}>
        <div className="box-main">
          <h4 className="book-title">
            {book.title} - {book.author}
          </h4>
          <p className="price-text">
            Цена <span style={{ color: "#262626" }}>{book.price} лв.</span>
          </p>
          <div className="book-img">
            <img className="img" src={book.cover_url} alt="book" />
          </div>
        </div>
      </div>
      <BookItemModal
        book={book}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addItem={addItem}
      ></BookItemModal>
    </>
  );
};

export default BookItem;
