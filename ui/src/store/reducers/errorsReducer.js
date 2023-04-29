import * as mutations from "../mutations";
import { initialState } from "../initialState";

export const errors = (errors = initialState.errors, action) => {
  switch (action.type) {
    case mutations.CREATE_BOOK_FAILED:
      debugger;
      return { ...errors, manageBookErrors: action.errors };
    default:
      return errors;
  }
};
