import { TodoActionTypes } from "./todo.types";

const INITIAL_STATE = {
  todos: [],
  categorySelected: "default",
};

const todoReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case TodoActionTypes.UPDATE_TODOS:
      console.log("update todo");
      return {
        ...state,
        todos: action.payload,
      };

    case TodoActionTypes.SET_TODOS_CATEGORY:
      console.log("set category");
      return {
        ...state,
        categorySelected: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
