import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";

import BookItemModal from "./BookItemModal";
import "./BookItem.css";

export const BookItem = ({ book }) => {
  const { user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();

  return (
    <>
      <div className="col-md-3" onClick={() => setIsOpen(true)}>
        <figure className="product-style">
          <img src={book.cover_url} alt="Books" className="product-item" />
          {user?.nickname !== book.provider && (
            <button
              onClick={() => addItem(book)}
              type="button"
              className="add-to-cart"
            >
              Към количка
            </button>
          )}
          <figcaption>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <div className="item-price">{book.price}лв</div>
          </figcaption>
        </figure>
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
