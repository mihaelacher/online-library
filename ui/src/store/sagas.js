import { call, take, put, select } from "redux-saga/effects";

import * as mutations from "./mutations";
import * as api from "./api";

export function* bookCreationSaga() {
  while (true) {
    const { token, provider, book } = yield take(
      mutations.REQUEST_BOOK_CREATION
    );
    yield put(mutations.beginApiCall());
    book.provider = provider;
    try {
      const data = yield call(api.createBookApi, token, book);
      yield put(mutations.createBook(data));
    } catch (error) {
      const { data } = error.response;
      yield put(mutations.createBookFailed(data));
    }
  }
}

export function* bookUpdateSaga() {
  while (true) {
    const { token, book } = yield take(mutations.REQUEST_BOOK_UPDATE);
    yield put(mutations.beginApiCall());
    try {
      const data = yield call(api.updateBookApi, token, book);
      yield put(mutations.updateBook(data));
    } catch (error) {
      yield put(mutations.updateBookFailed(error.message));
    }
  }
}

export function* fetchBooksSaga() {
  while (true) {
    const { loggedUser } = yield take(mutations.FETCH_BOOKS);
    yield put(mutations.beginApiCall());
    try {
      const data = yield call(api.fetchBooksApi);
      yield put(mutations.fetchBooksSuccess(data, loggedUser));
    } catch (error) {
      yield put(mutations.fetchBooksFailed(error.message));
    }
  }
}

export function* fetchSearchBooksSaga() {
  while (true) {
    const { params } = yield take(mutations.FETCH_SEARCH_BOOKS);
    let searchBooks = yield select((state) => state.books);

    if (params.searchText.length) {
      searchBooks = searchBooks.filter(
        (book) =>
          book.title.indexOf(params.searchText) >= 0 ||
          book.description.indexOf(params.searchText) >= 0
      );
    }

    if (params.genres.length) {
      searchBooks = searchBooks.filter((book) =>
        intersect(book.genres, params.genres)
      );
    }

    yield put(mutations.fetchSearchBooksSuccess(searchBooks));
  }
}

function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}
