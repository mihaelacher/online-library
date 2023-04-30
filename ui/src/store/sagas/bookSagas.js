import { all, call, put, select, takeEvery } from "redux-saga/effects";

import * as bookMutations from "../mutations/bookMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/bookApi";
import { intersect } from "../../utils/common/arrUtil";

export function* watchBooksSagas() {
  yield all([
    takeEvery(bookMutations.REQUEST_BOOK_CREATION, bookCreationSaga),
    takeEvery(bookMutations.REQUEST_BOOK_UPDATE, bookUpdateSaga),
    takeEvery(bookMutations.REQUEST_BOOK_DELETE, bookDeleteSaga),
    takeEvery(bookMutations.FETCH_BOOKS, fetchBooksSaga),
    takeEvery(bookMutations.FETCH_SEARCH_BOOKS, fetchSearchBooksSaga),
  ]);
}

export function* bookCreationSaga(action) {
  const { token, provider, book } = action;
  yield put(beginApiCall());
  book.provider = provider;
  try {
    const data = yield call(api.createBookApi, token, book);
    yield put(bookMutations.createBookSuccess(data));
  } catch (error) {
    const { data } = error.response;
    yield put(bookMutations.createBookFailed(data));
  }
}

export function* bookUpdateSaga(action) {
  const { token, book } = action;
  yield put(beginApiCall());
  try {
    const data = yield call(api.updateBookApi, token, book);
    yield put(bookMutations.updateBookSuccess(data));
  } catch (error) {
    yield put(bookMutations.updateBookFailed(error.message));
  }
}

export function* bookDeleteSaga(action) {
  const { bookId, token, provider } = action;
  yield put(beginApiCall());
  try {
    yield call(api.deleteBookApi, bookId, token, provider);
    yield put(bookMutations.deleteBookSuccess(bookId));
  } catch (error) {
    yield put(bookMutations.deleteBookFailed(error.message));
  }
}

export function* fetchBooksSaga(action) {
  const { loggedUser } = action;
  yield put(beginApiCall());
  try {
    const data = yield call(api.fetchBooksApi);
    yield put(bookMutations.fetchBooksSuccess(data, loggedUser));
  } catch (error) {
    yield put(bookMutations.fetchBooksFailed(error.message));
  }
}

export function* fetchSearchBooksSaga(action) {
  const { params } = action;
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

  yield put(bookMutations.fetchSearchBooksSuccess(searchBooks));
}
