import * as mutations from "../mutations/userMutations";
import { initialState } from "../initialState";
import { unsetArrElement } from "../../utils/common/arrUtil";

export const loggedUser = (loggedUser = initialState.loggedUser, action) => {
  switch (action.type) {
    case mutations.FETCH_LOGGED_USER_SUCCESS:
      return action.user;
    case mutations.FOLLOW_USER_SUCCESS:
      return loggedUser.following.push(action.following);
    case mutations.UNFOLLOW_USER_SUCCESS:
      return {
        ...loggedUser,
        following: unsetArrElement(
          unsetArrElement(action.following, loggedUser.following)
        ),
      };
    case mutations.ADD_TO_FAVORITES_SUCCESS:
      return {
        ...loggedUser,
        favorites: [...loggedUser.favorites, action.bookId],
      };
    case mutations.REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...loggedUser,
        favorites: unsetArrElement(
          unsetArrElement(action.bookId, loggedUser.favorites)
        ),
      };
    default:
      return loggedUser;
  }
};
