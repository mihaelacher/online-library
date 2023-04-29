import * as mutations from "../mutations";
import { initialState } from "../initialState";

export const searchBooks = (searchBooks = initialState.searchBooks, action) => {
  switch (action.type) {
    case mutations.FETCH_BOOKS_SUCCESS:
      return action.books;
    case mutations.FETCH_SEARCH_BOOKS_SUCCESS:
      return action.searchBooks;
    default:
      return searchBooks;
  }
};
