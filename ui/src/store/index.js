import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { watchBooksSagas } from "./sagas/bookSagas";
import { watchUsersSagas } from "./sagas/userSagas";
import { watchCommentsSagas } from "./sagas/commentSagas";
import { watchRatingsSagas } from "./sagas/ratingSagas";
import rootReducer from "./reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(createLogger())
      .concat(sagaMiddleware),
});

sagaMiddleware.run(watchBooksSagas);
sagaMiddleware.run(watchUsersSagas);
sagaMiddleware.run(watchCommentsSagas);
sagaMiddleware.run(watchRatingsSagas);
