import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";

import "./BookItemModal.css";
import ProfileCardModal from "../auth/ProfileCardModal";

function BookItemModal({ book, isOpen, setIsOpen }) {
  const { user } = useAuth0();
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
        <section className="bg-sand padding-large">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  className="product-image"
                  src={book.cover_url}
                  alt="book"
                />
              </div>

              <div className="col-md-6 pl-5">
                <div className="product-detail">
                  <h1 className="text-center">{book.title}</h1>
                  <p>{book.author}</p>
                  <span className="price colored">{book.price}лв.</span>

                  <p> {book.description} </p>

                  {user?.nickname !== book.provider ? (
                    <>
                      <button
                        name="add-to-cart"
                        className="button"
                        onClick={() => addItem(book)}
                      >
                        Добави в количка
                      </button>
                      <button
                        style={{ marginLeft: "30px" }}
                        className="button"
                        onClick={() => setIsProfileOpen(true)}
                      >
                        Публикувал
                      </button>
                    </>
                  ) : (
                    <button
                      style={{ marginLeft: "30px" }}
                      className="button"
                      onClick={() => setIsProfileOpen(true)}
                    >
                      Редактирай
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
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
