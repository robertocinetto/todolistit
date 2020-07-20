import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import todoReducer from "./todo/todo.reducer";

export default combineReducers({
  user: userReducer,
  todos: todoReducer,
});
