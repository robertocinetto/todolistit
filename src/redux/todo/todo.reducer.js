import { TodoActionTypes } from "./todo.types";

const INITIAL_STATE = {
  todos: [],
  categorySelected: "default",
  categoriesList: [],
  modalStatus: false,
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodoActionTypes.UPDATE_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case TodoActionTypes.SET_TODOS_CATEGORY:
      return {
        ...state,
        categorySelected: action.payload,
      };

    case TodoActionTypes.SET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.payload,
      };

    case TodoActionTypes.SET_NEW_TODO_MODAL_OPEN:
      return {
        ...state,
        modalStatus: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
