import React from "react";
import { connect } from "react-redux";

import BookItem from "./BookItem";
import Loading from "../common/Loading";
import "./BookList.css";

export const BookList = ({ searchBooks, loading }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {searchBooks.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>Няма резултати от търсенето!</h1>
      ) : (
        <div className="book-list-wrapper">
          {searchBooks.map((book) => (
            <BookItem book={book} key={book._id} />
          ))}
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    searchBooks: state.searchBooks,
    loading: state.apiCallsInProgress > 0,
  };
}

export const ConnectedBookList = connect(mapStateToProps)(BookList);
