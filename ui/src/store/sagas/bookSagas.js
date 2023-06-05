import { all, call, put, select, takeEvery } from "redux-saga/effects";

import * as bookMutations from "../mutations/bookMutations";
import { beginApiCall } from "../mutations/apiMutations";
import * as api from "../api/bookApi";
import { intersect } from "../../utils/common/arrUtil";
import { getBookRatings } from "../../utils/common/bookUtil";

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
  yield put(beginApiCall());
  try {
    const loggedUser = yield select((state) => state.loggedUser) ??
      action.loggedUser;
    const ratings = yield select((state) => state.ratings);
    const ratingByBookId = getBookRatings(ratings);
    const data = yield call(api.fetchBooksApi);
    const followers = loggedUser?.followers;
    const following = loggedUser?.following;
    const promoBooksUsers = intersect(following, followers);

    yield put(
      bookMutations.fetchBooksSuccess(
        data.map((book) => {
          book.rating = ratingByBookId[book._id.toString()]?.rating ?? 0;

          return promoBooksUsers.includes(book.provider)
            ? { ...book, promoPrice: book.price / 2 }
            : book;
        }),
        loggedUser?.email
      )
    );
  } catch (error) {
    yield put(bookMutations.fetchBooksFailed(error.message));
  }
}

export function* fetchSearchBooksSaga(action) {
  const { searchText } = action;
  let searchBooks = yield select((state) => state.books);
  if (searchText.length) {
    searchBooks = searchBooks.filter(
      (book) =>
        book.title.indexOf(searchText) >= 0 ||
        book.description.indexOf(searchText) >= 0
    );
  }

  yield put(bookMutations.fetchSearchBooksSuccess(searchBooks));
}
