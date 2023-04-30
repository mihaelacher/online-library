import * as mutations from "../mutations/bookMutations";
import { initialState } from "../initialState";

export const books = (books = initialState.books, action) => {
  switch (action.type) {
    case mutations.FETCH_BOOKS_SUCCESS:
      return action.books;
    case mutations.CREATE_BOOK_SUCCESS:
      return [...books, action.book];
    case mutations.UPDATE_BOOK_SUCCESS:
      return books.map((book) =>
        book._id === action.book._id ? action.book : book
      );
    case mutations.DELETE_BOOK_SUCCESS:
      return books.map((book) =>
        book._id === action.bookId ? { ...book, deletedAt: Date.now } : book
      );
    default:
      return books;
  }
};
