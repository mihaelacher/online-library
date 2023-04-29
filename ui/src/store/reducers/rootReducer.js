import { combineReducers } from "@reduxjs/toolkit";

import { books } from "./bookReducer";
import { searchBooks } from "./searchBookReducer";
import { providedBooks } from "./providedBooksReducer";
import { rentedBooks } from "./rentedBooksReducer";
import { apiCallsInProgress } from "./apiStatusReducer";
import { errors } from "./errorsReducer";

const rootReducer = combineReducers({
  books,
  searchBooks,
  providedBooks,
  rentedBooks,
  apiCallsInProgress,
  errors,
});

export default rootReducer;
