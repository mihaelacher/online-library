import * as mutations from "../mutations";
import { initialState } from "../initialState";

export const books = (books = initialState.books, action) => {
  switch (action.type) {
    case mutations.FETCH_BOOKS_SUCCESS:
      return action.books;
    case mutations.CREATE_BOOK:
      return [...books, action.book];
    case mutations.UPDATE_BOOK:
      return books.map((book) =>
        book._id === action.book._id ? action.book : book
      );
    default:
      return books;
  }
};
