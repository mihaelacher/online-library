import React from "react";
import ReactModal from "react-modal";

function BookItemModal({ book, isOpen, setIsOpen, addItem }) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Book Modal"
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
    >
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-3">
            <img className="img" src={book.cover_url} alt="book" />
          </div>
          <div className="col-sm-8">
            <h3>Заглавие: {book.title}</h3>
            <h5>Автор: {book.author}</h5>
            <p>{book.description}</p>
          </div>
          <div className="buyBt">
            <button onClick={() => addItem(book)}>Купи</button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default BookItemModal;
