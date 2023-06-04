import { combineReducers } from "@reduxjs/toolkit";

import { books } from "./bookReducer";
import { users } from "./usersReducer";
import { loggedUser } from "./loggedUserReducer";
import { searchBooks } from "./searchBookReducer";
import { comments } from "./commentReducer";
import { ratings } from "./ratingReducer";
import { apiCallsInProgress } from "./apiStatusReducer";
import { errors } from "./errorsReducer";

const rootReducer = combineReducers({
  books,
  users,
  loggedUser,
  searchBooks,
  comments,
  ratings,
  apiCallsInProgress,
  errors,
});

export default rootReducer;
