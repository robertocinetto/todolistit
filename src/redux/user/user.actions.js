import { UserActionTypes } from "./user.types";

export const setCurrentUserInState = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER_IN_STATE,
  payload: user,
});
