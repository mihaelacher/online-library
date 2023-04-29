import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";

import BookItemModal from "./BookItemModal";
import "./BookItem.css";

export const BookItem = ({ book }) => {
  const { user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();

  return (
    <div className="col-lg-3">
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
        <div className="btn-main">
          {book.provider === user?.email ? (
            <div className="buy-btn">
              <Link to={`/book/${book._id}`}>
                <button className="btn btn-quarternary btn-round">
                  Редактирай
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="buy-btn">
                <button
                  className="btn btn-secondary btn-round"
                  onClick={() => addItem(book)}
                >
                  Купи
                </button>
              </div>
            </>
          )}
          <div className="seemore-btn">
            <button
              className="btn btn-tertiary btn-round"
              onClick={() => setIsOpen(true)}
            >
              Допълнителна Информация
            </button>
          </div>
          <BookItemModal
            book={book}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addItem={addItem}
          ></BookItemModal>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
