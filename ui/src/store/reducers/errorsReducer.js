import * as mutations from "../mutations/bookMutations";
import { initialState } from "../initialState";

export const errors = (errors = initialState.errors, action) => {
  switch (action.type) {
    case mutations.CREATE_BOOK_FAILED:
      return { ...errors, manageBookErrors: action.errors };
    default:
      return errors;
  }
};
