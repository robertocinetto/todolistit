import { TodoActionTypes } from "./todo.types";

export const updateTodos = (todos) => {
  return {
    type: TodoActionTypes.UPDATE_TODOS,
    payload: todos,
  };
};

export const setSelectedCategory = (category) => {
  return {
    type: TodoActionTypes.SET_TODOS_CATEGORY,
    payload: category,
  };
};
