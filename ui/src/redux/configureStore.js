import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

export default function createStore(initialState) {
  return configureStore(rootReducer, initialState);
}
