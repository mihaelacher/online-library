import * as mutations from "../mutations";
import { initialState } from "../initialState";

export const providedBooks = (
  providedBooks = initialState.providedBooks,
  action
) => {
  switch (action.type) {
    case mutations.FETCH_BOOKS_SUCCESS:
      return !action.loggedUser
        ? []
        : action.books.filter((book) => book.provider === action.loggedUser);
    default:
      return providedBooks;
  }
};
