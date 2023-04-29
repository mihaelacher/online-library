import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import * as sagas from "./sagas";
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

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
