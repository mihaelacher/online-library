import React from "react";
import { connect } from "react-redux";

import Loading from "../common/Loading";
import { BookList } from "./BookList";

export const SearchBooksList = ({ searchBooks, loading }) => {
  if (loading) {
    return <Loading />;
  }

  return <BookList books={searchBooks} />;
};

function mapStateToProps(state) {
  return {
    searchBooks: state.searchBooks,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(SearchBooksList);
