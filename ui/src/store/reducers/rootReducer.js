import { combineReducers } from "@reduxjs/toolkit";

import { books } from "./bookReducer";
import { users } from "./usersReducer";
import { loggedUser } from "./loggedUserReducer";
import { searchBooks } from "./searchBookReducer";
import { apiCallsInProgress } from "./apiStatusReducer";
import { errors } from "./errorsReducer";

const rootReducer = combineReducers({
  books,
  users,
  loggedUser,
  searchBooks,
  apiCallsInProgress,
  errors,
});

export default rootReducer;
