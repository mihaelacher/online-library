import * as mutations from "../mutations/ratingMutations";
import { initialState } from "../initialState";

export const ratings = (state = initialState.ratings, action) => {
  switch (action.type) {
    case mutations.FETCH_RATINGS_SUCCESS:
      return action.ratings;
    case mutations.BOOK_RATING_SUCCESS:
      return [...state, action.ratings];
    default:
      return state;
  }
};
