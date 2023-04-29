import React from "react";
import { connect } from "react-redux";

import BookItem from "./BookItem";
import { ConnectedSearchBar } from "../common/SearchBar";
import Loading from "../common/Loading";
import "./BookList.css";

export const BookList = ({ searchBooks, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (searchBooks.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <>
      <ConnectedSearchBar />
      <div className="book-list-wrapper">
        {searchBooks.map((book) => (
          <BookItem book={book} key={book._id} />
        ))}
      </div>
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
