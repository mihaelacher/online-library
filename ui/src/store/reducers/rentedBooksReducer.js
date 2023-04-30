import * as mutations from "../mutations/bookMutations";
import { initialState } from "../initialState";

export const rentedBooks = (rentedBooks = initialState.rentedBooks, action) => {
  switch (action.type) {
    case mutations.FETCH_BOOKS_SUCCESS:
      return !action.loggedUser
        ? []
        : action.books.filter(
            (book) => book.renters && book.renters.includes(action.loggedUser)
          );
    default:
      return rentedBooks;
  }
};
