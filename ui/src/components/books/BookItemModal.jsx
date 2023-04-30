import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCart } from "react-use-cart";

import "./BookItemModal.css";
import ProfileCardModal from "../auth/ProfileCardModal";

function BookItemModal({ book, isOpen, setIsOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { addItem } = useCart();
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Book Modal"
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
      >
        <div className="book-modal__content">
          <div className="book-modal__image">
            <img src={book.cover_url} alt="book" />
          </div>
          <div className="book-modal__info">
            <h3 className="book-modal__title">
              {book.title} - {book.author}
            </h3>
            <p className="book-modal__description">{book.description}</p>

            <div className="book-modal__buttons">
              <button
                className="book-modal__button"
                onClick={() => addItem(book)}
              >
                Купи
              </button>
              <button
                className="book-modal__button"
                onClick={() => setIsOpen(false)}
              >
                Затвори
              </button>
              <button
                className="book-modal__button"
                onClick={() => setIsProfileOpen(true)}
              >
                профил
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
      <ProfileCardModal
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
        username={book?.provider}
      />
    </>
  );
}

export default BookItemModal;
